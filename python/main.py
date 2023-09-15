import os
import typer
import whisper
import ast
import subprocess
import json
from moviepy.editor import VideoFileClip, TextClip, concatenate_videoclips, CompositeVideoClip
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

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
    # Load the video
    video = VideoFileClip(file_path)
    
    # Initialize a list to hold video segments with subtitles
    clips_with_subtitles = []

    for idx, segment in enumerate(segments):
        start_time = segment['start']
        end_time = segment['end']
        subtitle_text = segment['text']

        # Extract the subclip based on start and end times
        subclip = video.subclip(start_time, end_time)

        text = TextClip(subtitle_text, font='Arial', fontsize=24, color='white')
        text = text.set_pos('center').set_duration(end_time - start_time)

        compose = CompositeVideoClip([subclip, text])
        clips_with_subtitles.append(compose)

    # Concatenate all clips with subtitles
    final_video = concatenate_videoclips(clips_with_subtitles)

    # Define the output file path
    output_path = os.path.join(OUTPUT_DIR, OUTPUT_VIDEO_FILENAME)

    # Write the final video to the output file
    final_video.write_videofile(output_path, codec='libx264', audio_codec='aac')

    print("Video created:", output_path)


if __name__ == "__main__":
    app()
