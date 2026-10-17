from pathlib import Path
import shutil

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "BernardMangulabnan.pdf"
PUBLIC = ROOT / "public" / "BernardMangulabnan.pdf"


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=3.5 * mm,
        rightMargin=3.5 * mm,
        topMargin=4 * mm,
        bottomMargin=4 * mm,
        title="Bernard C. Mangulabnan - Resume",
        author="Bernard C. Mangulabnan",
        subject="Full Stack Web and Mobile Developer",
    )

    base = getSampleStyleSheet()
    name = ParagraphStyle(
        "Name",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=16.5,
        leading=19,
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=7.7,
        leading=9.4,
        alignment=TA_CENTER,
    )
    section = ParagraphStyle(
        "Section",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        spaceBefore=10.5,
        spaceAfter=1,
    )
    body = ParagraphStyle(
        "Body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.35,
        leading=11.7,
        spaceAfter=1,
    )
    role = ParagraphStyle(
        "Role",
        parent=body,
        fontName="Helvetica-Bold",
        fontSize=8.55,
        leading=11.7,
    )
    date = ParagraphStyle(
        "Date",
        parent=body,
        fontSize=8.3,
        leading=11.7,
        alignment=2,
    )
    bullet = ParagraphStyle(
        "Bullet",
        parent=body,
        leftIndent=6,
        firstLineIndent=-5,
        bulletIndent=0,
        fontSize=8.2,
        leading=11.6,
        spaceAfter=1,
    )
    subhead = ParagraphStyle(
        "Subhead",
        parent=body,
        fontName="Helvetica-Bold",
        fontSize=8.4,
        leading=11.5,
        spaceBefore=2.5,
        spaceAfter=0.4,
    )
    project = ParagraphStyle(
        "Project",
        parent=body,
        fontSize=8.1,
        leading=11.3,
        spaceBefore=0.5,
        spaceAfter=0,
    )

    story = []

    def section_heading(label: str) -> None:
        story.append(Paragraph(label, section))
        story.append(HRFlowable(width="100%", thickness=0.7, color=colors.black, spaceBefore=0, spaceAfter=3))

    def role_row(title: str, period: str) -> None:
        table = Table(
            [[Paragraph(title, role), Paragraph(period, date)]],
            colWidths=[doc.width - 33 * mm, 33 * mm],
            hAlign="LEFT",
        )
        table.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        story.append(table)

    def bullet_line(text: str) -> None:
        story.append(Paragraph(f"&bull; {text}", bullet))

    def project_entry(title: str, tech: str, details: list[str]) -> None:
        parts = [Paragraph(f"<b>{title}</b> - {tech}", project)]
        for detail in details:
            parts.append(Paragraph(f"&bull; {detail}", bullet))
        story.append(KeepTogether(parts))
        story.append(Spacer(1, 1.2))

    story.append(Paragraph("BERNARD C. MANGULABNAN", name))
    story.append(
        Paragraph(
            "San Luis, Pampanga, Philippines | +63 985 925 7816 | mangulabnan.bernard321@gmail.com",
            contact,
        )
    )
    story.append(
        Paragraph(
            "Portfolio: bernardmangulabnan.com | GitHub: github.com/Mangulabnan-Bernard | LinkedIn: linkedin.com/in/bernard-mangulabnan",
            contact,
        )
    )
    story.append(Spacer(1, 2))

    section_heading("PROFESSIONAL SUMMARY")
    story.append(
        Paragraph(
            "Full Stack Web and Mobile Developer and 2026 Computer Science graduate from Holy Cross College, Pampanga. "
            "Builds responsive websites, back-end systems, and cross-platform apps using Next.js, TypeScript, Node.js, Flutter, and relational databases. "
            "Uses AI tools during development, then reviews and tests the output before use.",
            body,
        )
    )

    section_heading("WORK EXPERIENCE")
    role_row("Freelance Web Developer", "Feb 2025 - Jun 2026")
    bullet_line("Developed custom websites and web apps from design to deployment using Next.js, Tailwind CSS, and AI tools.")
    role_row("Part-Time Web Developer | AP Global IT Solutions Inc, Antipolo (Hybrid)", "Sep 2025 - May 2026")
    bullet_line("Maintained internal systems, handled updates, bug fixes, and data management; documented new features.")
    bullet_line("Conducted training sessions teaching Flutter and Dart fundamentals to upskill team members.")
    bullet_line("Created website templates for birthdays, events, RSVPs, and other occasions.")
    role_row("Intern | AP Global IT Solutions Inc, Antipolo (Onsite)", "Aug 2025 - Sep 2025")
    bullet_line("Analyzed system architecture and rebuilt a functional replica using Next.js with synthetic test data.")
    bullet_line("Documented system workflows and taught Next.js fundamentals to fellow interns.")

    section_heading("PROJECTS")
    story.append(Paragraph("Web", subhead))
    project_entry(
        "DevPath.hub - Guided Learning Platform",
        "Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, anime.js, Vercel",
        ["A guided platform for beginners learning a full tech stack. It includes step-by-step learning paths, simple explanations, project-based lessons, progress tracking, and an error helper."],
    )
    project_entry(
        "All4Home - Home Services Platform",
        "Next.js, Tailwind CSS",
        ["Lets customers browse and book home services while providers list their available services."],
    )
    project_entry(
        "Tourist Spots Platform",
        "Next.js, Prisma ORM, UploadThing, Tailwind CSS, Vercel",
        ["Shows tourist spots around Pampanga with location details and photos."],
    )
    project_entry(
        "Barangay Incident & Complaint Report System",
        "Next.js, TypeScript, Tailwind CSS, Prisma ORM, MySQL",
        ["Replaces paper logbooks with a digital system for barangay incident and complaint reports."],
    )

    story.append(Paragraph("Mobile", subhead))
    project_entry(
        "Anong Ulam Today? - Filipino Recipe Helper",
        "Flutter, Dart, Riverpod, GoRouter, Mobile, Web",
        ["A mobile and web app that helps users choose ulam, browse recipes, manage fridge ingredients, and add dishes. It also includes timed greetings, random recipe suggestions, ingredient filters, and step-by-step instructions."],
    )
    project_entry(
        "ATM Go - Mobile Banking App",
        "Flutter, Dart, Android & iOS",
        ["Provides money transfers, account management, and secure login in a cross-platform mobile app."],
    )
    project_entry(
        "Smart Grow - AI Crop Health Monitor (Thesis)",
        "Flutter, Dart, Android & iOS, Machine Learning (TensorFlow)",
        [
            "Uses machine learning to identify diseases in Tomato, Red Onion, and Garlic crops from photos and track crop health for seven days.",
            "Evaluated using Accuracy, Precision, Recall, and F1-Score; app quality assessed using ISO/IEC 25010.",
        ],
    )

    section_heading("TECHNICAL SKILLS")
    story.append(Paragraph("<b>Front-End:</b> HTML5 & CSS3, JavaScript (ES6+) & TypeScript, React.js & Next.js, Tailwind CSS, Responsive Design & PWA", body))
    story.append(Paragraph("<b>Mobile:</b> Flutter & Dart, Android & iOS, Cross-Platform Development, Mobile UI/UX Design, RESTful API Integration, State Management", body))
    story.append(Paragraph("<b>Back-End & Database:</b> Node.js, PostgreSQL / Prisma ORM, MySQL, PHP", body))
    story.append(Paragraph("<b>Tools & Platforms:</b> Git & Version Control, Vercel / Hostinger / AWS, CI/CD, Agile / Scrum", body))
    story.append(Paragraph("<b>AI Tools:</b> Claude & Claude Code, ChatGPT, Cursor, Windsurf", body))
    story.append(Paragraph("<b>Machine Learning:</b> TensorFlow", body))

    section_heading("EDUCATION")
    education = Table(
        [
            [Paragraph("<b>BS Computer Science</b> | Holy Cross College Sta. Lucia, Santa Ana, Pampanga", body), Paragraph("Jun 2022 - May 2026", date)],
            [Paragraph("<b>Secondary</b> | San Luis National High School, Pampanga", body), Paragraph("Jun 2014 - Aug 2022", date)],
        ],
        colWidths=[doc.width - 38 * mm, 38 * mm],
    )
    education.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
            ]
        )
    )
    story.append(education)

    section_heading("REFERENCES")
    references = Table(
        [
            [
                Paragraph("John Francis Quinzon - Senior Web Developer | +63 951 755 6984", body),
                Paragraph("Mark Irion Alarde - Senior Web Developer | +63 907 013 2571", body),
            ]
        ],
        colWidths=[doc.width / 2, doc.width / 2],
    )
    references.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 5),
                ("LEFTPADDING", (1, 0), (1, 0), 5),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(references)

    doc.build(story)
    shutil.copyfile(OUTPUT, PUBLIC)


if __name__ == "__main__":
    build_resume()
