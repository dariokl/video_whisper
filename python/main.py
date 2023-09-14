import os
import typer
import whisper
import ast
import subprocess
import json

app = typer.Typer()

FONT_FILE_PATH = "/Windows/Fonts/arial.ttf"
OUTPUT_DIR = os.path.expanduser("~")
OUTPUT_VIDEO_FILENAME = "output_video_with_subtitles.mp4"

@app.command()
def transcribe_audio(file_path):
    model = whisper.load_model("base")
    result = model.transcribe(file_path, fp16=False)
    print(json.dumps(result))

@app.command()
def create_video(file_path, segments=typer.Argument(..., callback=ast.literal_eval)):
    """Create a video with subtitles based on segments."""
    filter_complex = []

    for idx, segment in enumerate(segments):
        start_time = segment['start']
        end_time = segment['end']
        subtitle_text = segment['text']

        subclip_filter = f"[0:v]trim=start={start_time}:end={end_time},setpts=PTS-STARTPTS[v{idx}]"
        filter_complex.append(subclip_filter)

        drawtext_filter = (
            f"[v{idx}]drawtext=fontfile={FONT_FILE_PATH}:text={subtitle_text}:"
            f"fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=10:y=10[v{idx}_subtitled]"
        )
        filter_complex.append(drawtext_filter)

    filter_complex = ";".join(filter_complex)

    output_path = os.path.join(OUTPUT_DIR, OUTPUT_VIDEO_FILENAME)

    ffmpeg_command = [
        "ffmpeg",
        "-i", file_path,
        "-filter_complex", filter_complex,
        "-map", f"[v{len(segments) - 1}_subtitled]",
        "-c:v", "libx264",
        "-c:a", "aac",
        "-strict", "experimental",
        output_path
    ]

    subprocess.run(ffmpeg_command)
    print("Video created:", output_path)

if __name__ == "__main__":
    app()
