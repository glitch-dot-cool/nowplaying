# nowplaying

a simple html-based application for displaying track titles in OBS.

![demo image](./example.png)

### how it works

very primitively - copy/paste a track title into `nowplaying.txt` and the application will poll it for changes. when it sees a change, it will fade out the old track title and fade in the new one. that's it.

### how to use in OBS

add a `Browser` media source to your scene, select `local file`, and select `nowplaying.html`. configure whatever size you want, and that's it!

### configuration

there are a few things you can tweak:

- `LOCAL_TRACKLIST_FILE_NAME`
  - where the code expects the source file to exist
  - default is `nowplaying.txt`
- `DISPLAY_PREFIX`
  - this gets prepended to the track title
  - default is `now playing:`
- `FETCH INTERVAL`
  - how quickly the code checks for a new track
  - default is `5000`ms
- `CSS_TRANSITION_TIME`
  - how long the fade in/out animations last
  - default is `500`ms
  - note: this is set in as a _CSS variable_, not a JS variable
    - see `--fade-duration` within the `<style>` tag
- `ENABLE_GLITCH_EFFECT`
  - does what it says on the can
  - set the value to `false` to turn it off

beyond that, simply update the css if you want to change font, size, colors, etc.
