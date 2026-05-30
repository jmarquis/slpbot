FROM node:26.2.0-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
  ffmpeg \
  git \
  libgpg-error0 \
  libopengl-dev \
  python3-pip \
  python3.13 \
  python3.13-venv \
  xauth \
  xvfb \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

RUN python3 -m venv .venv
ENV PATH="/opt/app/.venv/bin:$PATH"
RUN pip install --no-cache-dir "slp2mp4 @ git+https://github.com/davisdude/slp2mp4.git"

COPY .slp2mp4.toml /root/
COPY . .

ENV LIBGL_ALWAYS_SOFTWARE=1
ENV DISPLAY=:99

RUN echo 'pcm.!default { type null }\nctl.!default { type null }' > /etc/asound.conf

VOLUME /opt/app

CMD ["npm", "run", "start"]
