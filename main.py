import sys
from pathlib import Path

from config.settings import INPUT_DIR

from src.audio import convert_to_wav
from src.transcription import transcribe_audio
from src.diarization import assign_default_speaker
from src.speaker_identification import identify_student_speaker
from src.student_extraction import (
    extract_student_segments,
)
from src.sentiment import (
    analyze_segments as analyze_sentiment,
    calculate_overall_sentiment,
)
from src.emotion import (
    analyze_segments as analyze_emotion,
)
from src.report import generate_reports


def find_audio_file():

    supported_extensions = [
        ".mp3",
        ".mpeg",
        ".wav",
        ".m4a",
        ".flac",
        ".ogg",
        ".aac",
    ]

    files = []

    for extension in supported_extensions:

        files.extend(
            INPUT_DIR.glob(
                f"*{extension}"
            )
        )

    if not files:

        raise FileNotFoundError(
            "\nNo audio file found in input folder.\n"
            "Put your recorded audio inside:\n"
            f"{INPUT_DIR}\n"
        )

    if len(files) > 1:

        print(
            "\nMultiple audio files found:"
        )

        for index, file in enumerate(
            files,
            start=1
        ):

            print(
                f"{index}. {file.name}"
            )

        try:

            choice = int(
                input(
                    "\nSelect audio number: "
                )
            )

            return files[
                choice - 1
            ]

        except (
            ValueError,
            IndexError
        ):

            raise ValueError(
                "Invalid audio selection."
            )

    return files[0]


def main():

    print()
    print("=" * 70)
    print(
        "TECHPANDA STUDENT SENTIMENT ANALYSIS"
    )
    print("=" * 70)

    try:

        # ------------------------------------------------
        # STEP 1
        # Find audio
        # ------------------------------------------------

        audio_file = find_audio_file()

        print(
            f"\nInput audio:"
            f" {audio_file.name}"
        )

        # ------------------------------------------------
        # STEP 2
        # Convert audio
        # ------------------------------------------------

        processed_audio = convert_to_wav(
            str(audio_file)
        )

        # ------------------------------------------------
        # STEP 3
        # Transcription
        # ------------------------------------------------

        transcript, language = transcribe_audio(
            processed_audio
        )

        if not transcript:

            raise RuntimeError(
                "No speech was detected."
            )

        # ------------------------------------------------
        # STEP 4
        # Speaker assignment
        # ------------------------------------------------

        print(
            "\n[3/6] Identifying speaker..."
        )

        transcript = assign_default_speaker(
            transcript
        )

        student_speaker = identify_student_speaker(
            transcript
        )

        print(
            f"Student speaker: "
            f"{student_speaker}"
        )

        # ------------------------------------------------
        # STEP 5
        # Student extraction
        # ------------------------------------------------

        student_segments = (
            extract_student_segments(
                transcript,
                student_speaker
            )
        )

        print(
            f"Student segments: "
            f"{len(student_segments)}"
        )

        if not student_segments:

            raise RuntimeError(
                "No student speech detected."
            )

        # ------------------------------------------------
        # STEP 6
        # Sentiment
        # ------------------------------------------------

        sentiment_results = analyze_sentiment(
            student_segments
        )

        overall_sentiment = (
            calculate_overall_sentiment(
                sentiment_results
            )
        )

        # ------------------------------------------------
        # STEP 7
        # Emotion
        # ------------------------------------------------

        emotion_results = analyze_emotion(
            student_segments
        )

        # ------------------------------------------------
        # STEP 8
        # Reports
        # ------------------------------------------------

        report = generate_reports(

            audio_file=str(
                audio_file.name
            ),

            language=language,

            student_speaker=
                student_speaker,

            transcript=
                transcript,

            sentiment_results=
                sentiment_results,

            emotion_results=
                emotion_results,

            overall_sentiment=
                overall_sentiment,
        )

        # ------------------------------------------------
        # FINAL RESULT
        # ------------------------------------------------

        print()
        print("=" * 70)
        print(
            "ANALYSIS COMPLETED SUCCESSFULLY"
        )
        print("=" * 70)

        print(
            "\nOVERALL SENTIMENT"
        )

        print(
            f"Result: "
            f"{overall_sentiment['label'].upper()}"
        )

        print(
            f"Positive: "
            f"{overall_sentiment['positive']}%"
        )

        print(
            f"Neutral: "
            f"{overall_sentiment['neutral']}%"
        )

        print(
            f"Negative: "
            f"{overall_sentiment['negative']}%"
        )

        print("\nGenerated files:")

        print(
            "output/processed_audio.wav"
        )

        print(
            "output/transcript.txt"
        )

        print(
            "output/transcript.json"
        )

        print(
            "output/sentiment_results.json"
        )

        print(
            "output/emotion_results.json"
        )

        print(
            "output/student_sentiment_report.json"
        )

        print(
            "output/student_sentiment_report.txt"
        )

        print()
        print("=" * 70)

    except Exception as error:

        print()
        print("=" * 70)
        print("ERROR")
        print("=" * 70)

        print(
            f"\n{error}"
        )

        print(
            "\nCheck the error above and try again."
        )

        sys.exit(1)


if __name__ == "__main__":
    main()