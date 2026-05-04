import webview
import os
import sys

def main():
    # Determine the absolute path to the directory containing our HTML files
    # This handles both normal execution and the PyInstaller bundled executable execution
    if getattr(sys, 'frozen', False):
        base_dir = sys._MEIPASS
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    
    html_file = os.path.join(base_dir, 'index.html')
    
    # Create the native application window
    window = webview.create_window(
        title='ScholarSync: Personalized Study Guard',
        url=html_file,
        width=1100,
        height=800,
        resizable=True,
        min_size=(800, 600),
        background_color='#f8fafc' # Matches our Tailwind slate-50 background
    )
    
    # Start the application loop. 
    # http_server=True ensures that local files (like app.js) are served over a local port
    # avoiding any CORS security restrictions from the browser engine.
    webview.start(http_server=True)

if __name__ == '__main__':
    main()
