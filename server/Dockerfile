FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

ENV ROOT=/usr/server/src
WORKDIR ${ROOT}

RUN pip install poetry

COPY ["pyproject.toml*", "poetry.lock*", "${ROOT}"]

RUN poetry config virtualenvs.in-project true
RUN if [ -f pyproject.toml ]; then poetry install; fi

ENTRYPOINT ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]