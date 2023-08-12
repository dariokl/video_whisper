import typer
import whisper
import json
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

app = typer.Typer()

@app.command()
def transcribe_audio(file_path):

    model = whisper.load_model("base")
    result = model.transcribe(file_path, fp16=False)

    print(json.dumps(result))

@app.command()
def create_video(file_path):

    ffmpeg_extract_subclip(file_path, 5, 10, targetname="test.mp4")

    print('here')

if __name__ == "__main__":
    app()