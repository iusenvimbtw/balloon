# ( LLM GENERATED WAFFLE)
## Balloon ( HARPOON BY ThePrimeagen but for the browser not as good ofc)
## Entire code is CLAUDE's work since i dont know about extension code
## Gets it purpose done

## Overview
Balloon is a browser extension designed to enhance tab navigation using quick and ergonomic key bindings. Users can mark tabs at specific positions and switch between them effortlessly.

## Features
- Mark tabs at user-defined positions instead of sequential numbers.
- Switch between marked tabs using intuitive shortcuts.
- Provides feedback on tab marking and switching.
- Persistent storage of marked tabs across browser sessions.
- Optimized for fast navigation without disrupting workflow.

## Installation
1. Download the extension source code.
2. Open `chrome://extensions/` in your browser.
3. Enable Developer Mode (toggle in the top right corner).
4. Click "Load Unpacked" and select the extension folder.
5. Start using the extension with the predefined shortcuts!

## Usage
- **Mark a tab**: Press `Ctrl+Shift+M` to mark the current tab at a user-defined position.
- **Switch tabs**: Use `Ctrl+Shift+[1-4]` to jump to a previously marked tab.
- **Check state**: The extension persists marked tabs and restores them on reload.

## Linux-Specific Enhancements
For Linux users, particularly those using **i3** or **Hyprland**, shortcuts can be further optimized with window manager bindings.

### i3 Key Bindings:
```sh
bindsym $win+m exec --no-startup-id "sleep 0.1 && xdotool getwindowfocus windowactivate --sync key ctrl+shift+m"
bindsym $win+bracketleft exec --no-startup-id "sleep 0.13 && xdotool key ctrl+shift+1"
bindsym $win+bracketright exec --no-startup-id "sleep 0.13 && xdotool key ctrl+shift+2"
bindsym $win+semicolon exec --no-startup-id "sleep 0.13 && xdotool key ctrl+shift+3"
bindsym $win+apostrophe exec --no-startup-id "sleep 0.13 && xdotool key ctrl+shift+4"
```
## ( SINCE I DONT USE HYPRLAND I ASKED CLAUDE AND IT SAID WTYPE IS THE XDOTOOL EQUIVALENT)
### Hyprland Key Bindings:
```ini
bind = SUPER, bracketleft, exec, sleep 0.13 && wtype -k ctrl+shift+1
bind = SUPER, bracketright, exec, sleep 0.13 && wtype -k ctrl+shift+2
bind = SUPER, semicolon, exec, sleep 0.13 && wtype -k ctrl+shift+3
bind = SUPER, apostrophe, exec, sleep 0.13 && wtype -k ctrl+shift+4
bind = SUPER, M, exec, sleep 0.1 && wtype -k ctrl+shift+m
```

### MAC OS (I dont use it hence claude GENERATED if doesnr work try adding some sleep time )
```ini
super + m
    osascript -e 'tell application "System Events" to keystroke "m" using {control down, shift down}'

super + bracketleft
    osascript -e 'tell application "System Events" to keystroke "1" using {control down, shift down}'

super + bracketright
    osascript -e 'tell application "System Events" to keystroke "2" using {control down, shift down}'

super + semicolon
    osascript -e 'tell application "System Events" to keystroke "3" using {control down, shift down}'

super + apostrophe
    osascript -e 'tell application "System Events" to keystroke "4" using {control down, shift down}'

```

## These are keybinds for Windows +     [       ]         ;          '       M'

## These bindings allow users to trigger tab switching commands even faster by mapping them to the window manager's key bindings.

