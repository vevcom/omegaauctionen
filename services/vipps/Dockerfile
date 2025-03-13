FROM python:3.12
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apt-get update
RUN apt-get install -y \
    build-essential \
    curl

RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /usr/app
COPY pyproject.toml .
COPY uv.lock .
COPY .python-version .

RUN uv sync

COPY . .

CMD ["uv", "run", "main.py"]
