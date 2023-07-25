import typer
import whisper
import json

app = typer.Typer()

@app.command()
def transcribe_audio(file_path):

    model = whisper.load_model("base")
    result = model.transcribe(file_path, fp16=False)

    print(json.dumps(result))

@app.command()
def convert_video():

    print('here')

if __name__ == "__main__":
    app()