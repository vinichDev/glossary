from app.docs import generate_static_docs
from app.main import app


def main() -> None:
    generate_static_docs(app.openapi())


if __name__ == "__main__":
    main()
