# Локальная демонстрация s30s без Docker и Python: маленький веб-сервер на PowerShell.
# Запуск: двойной клик по tools\demo.cmd  (или: powershell -ExecutionPolicy Bypass -File tools\demo.ps1 -Port 8090 -NoBrowser)
# Остановить: закрыть окно.
param([int]$Port = 8090, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path.TrimEnd('\') + '\'
$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'application/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'; '.webp' = 'image/webp'; '.gif' = 'image/gif'; '.pdf' = 'application/pdf'; '.woff2' = 'font/woff2'
  '.woff' = 'font/woff'; '.ttf' = 'font/ttf'; '.zip' = 'application/zip'; '.ico' = 'image/x-icon'; '.txt' = 'text/plain; charset=utf-8'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch {
  Write-Host "Порт $Port занят. Запустите с другим портом: tools\demo.cmd -Port 8091" -ForegroundColor Red
  exit 1
}
$url = "http://localhost:$Port/"
Write-Host ""
Write-Host "  s30s запущен: $url" -ForegroundColor Green
Write-Host "  Папка: $root"
Write-Host "  Файлы берутся с диска: после правок просто обновите страницу."
Write-Host "  Остановить: закройте это окно."
Write-Host ""
if (-not $NoBrowser) { Start-Process $url }
while ($listener.IsListening) {
  try { $ctx = $listener.GetContext() } catch { break }
  $res = $ctx.Response
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
    $rel = $path.TrimStart('/').Replace('/', '\')
    $full = [IO.Path]::GetFullPath((Join-Path $root $rel))
    $hidden = $rel -match '^(\.git|\.venv|tools|notes|materials-src|server)(\\|$)'
    if ($hidden -or -not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $full -PathType Leaf)) {
      $res.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes('404')
    } else {
      $ext = [IO.Path]::GetExtension($full).ToLower()
      if ($mime.ContainsKey($ext)) { $res.ContentType = $mime[$ext] } else { $res.ContentType = 'application/octet-stream' }
      $res.Headers['Cache-Control'] = 'no-cache'
      $bytes = [IO.File]::ReadAllBytes($full)
    }
    $res.ContentLength64 = $bytes.Length
    if ($ctx.Request.HttpMethod -ne 'HEAD') { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
    Write-Host ("{0} {1}" -f $res.StatusCode, $path) -ForegroundColor DarkGray
  } catch {
    try { $res.StatusCode = 500 } catch {}
  } finally {
    try { $res.Close() } catch {}
  }
}
