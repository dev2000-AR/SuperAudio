list2.php

<?php 
header('Access-Control-Allow-Origin: *');

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Library</title>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    <style>
   .frequency {
}
canvas {
  display: inline;
  max-width: 1000px;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        .trosta {
  width: 100%;
  float: left;
  display: block;
}

        .modal-content {
            background: #171717;
            min-width: 630px;
            background-position: top left;
            background-size: 100%;
            box-shadow: 0 0 400px #ff3bf2, 0 0 200px rgba(255, 59, 242, .75), 0 0 100px rgba(255, 59, 242, .5), 0 0 50px rgba(255, 59, 242, .35), 0 0 25px rgba(255, 59, 242, .2);
            color: #ccc;
        }

        .slide-wrapper {
            width: 15px;
            float: left;
            height: 400px;
            margin: 15px
        }

        .slide-wrapper input {
            direction: rtl;
            appearance: slider-vertical;
            writing-mode: vertical-lr
        }
        .slide-wrapper input {
  direction: rtl;
  appearance: slider-vertical;
  writing-mode: vertical-lr;
}
  @media only screen and (min-width: 500px) {
 .trosta { 
  width: 100%;
  float: left;

height:210px !important;
  display: block !important;
 background: transparent !important;
  padding-top: 10px;
  text-align: center;
}
  }



  .moduleon1{
  text-align: center;
  display: block;
  border-radius: 25px;
  color: #fff;
  box-shadow: 0 0 2px #fff, 0 0 10px #fff, 0 0 20px #0ba9ca, 0 0 30px #0ba9ca,
    0 0 40px #0ba9ca, 0 0 50px #0ba9ca;
  -webkit-animation: blink 0.7s infinite alternate;
  animation: blink 0.7s infinite alternate;
}

.moduleon1  {
  
}

@-webkit-keyframes blink {
  100% {
    box-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ba9ca,
      0 0 70px #0ba9ca, 0 0 80px #0ba9ca;
  }
}

@keyframes blink {
  100% {
    box-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ba9ca,
      0 0 70px #0ba9ca, 0 0 80px #0ba9ca;
  }
}
.App_layout__3ZZQj{
    overflow-y: scroll;
}
    </style>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/vuetify@3.6.9/dist/vuetify.min.css'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'>
    <!-- Your existing CSS styles remain the same -->
     <style>
        .suggestions-wrapper {
            position: relative;
            margin: 10px 0;
        }
        .suggestions-container {
            display: flex;
            overflow-x: hidden;
            scroll-behavior: smooth;
            gap: 10px;
            padding: 10px;
            background: var(--v-surface-variant);
            border-radius: 8px;
        }
        .suggestion-item {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            width: 250px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .suggestion-item:hover {
            transform: translateY(-2px) scale(1.02);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .suggestion-content {
            margin-left: 12px;
            overflow: hidden;
        }
        .suggestion-name {
            font-weight: 500;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .suggestion-type {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }
        .scroll-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            background: rgba(0, 0, 0, 0.5) !important;
            transition: all 0.3s ease;
        }
        .scroll-button:hover {
            background: rgba(0, 0, 0, 0.8) !important;
            transform: translateY(-50%) scale(1.1);
        }
        .scroll-button.left {
            left: -20px;
        }
        .scroll-button.right {
            right: -20px;
        }
        .top-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(26, 32, 44, 0.95);
            backdrop-filter: blur(10px);
            transform: translateY(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .top-nav.visible {
            transform: translateY(0);
        }
        .artist-banner {
            height: 300px;
            position: relative;
            margin-top: 20px;
            border-radius: 8px;
            overflow: hidden;
        }
        .albums-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
            margin-top: 20px;
        }
        .album-card {
            animation: fadeIn 0.5s ease forwards;
            opacity: 0;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 8px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.05);
        }
        .album-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            background: rgba(255, 255, 255, 0.08);
        }
        .album-card:active {
            transform: scale(0.98);
        }
        .vinyl-record {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            height: 90%;
            background: radial-gradient(circle at center, 
                #000 48%, 
                #333 49%, 
                #333 51%, 
                #000 52%,
                #000 54%,
                #333 55%,
                #333 57%,
                #000 58%
            );
            border-radius: 50%;
            transform: translate(-50%, -50%) translateX(-100%) rotate(0deg);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .vinyl-record.show {
            transform: translate(-50%, -50%) translateX(0) rotate(360deg);
            opacity: 0.8;
        }
        .vinyl-record:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10%;
            height: 10%;
            background: #fff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(20px);
            }
            to { 
                opacity: 1; 
                transform: translateY(0);
            }
        }
        .album-info {
            padding: 12px;
        }
        .album-title {
            font-size: 0.9rem;
            font-weight: 500;
            margin: 0;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .album-year {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 4px;
        }
        .album-type-label {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0, 0, 0, 0.7);
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.7rem;
            color: white;
            backdrop-filter: blur(4px);
            transition: all 0.3s ease;
        }
        .album-card:hover .album-type-label {
            background: rgba(0, 0, 0, 0.9);
            transform: translateY(-2px);
        }
        .track-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .track-item:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateX(4px);
        }
        .track-number {
            min-width: 32px;
            color: rgba(255, 255, 255, 0.7);
            font-variant-numeric: tabular-nums;
        }
        .track-duration {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9em;
            font-variant-numeric: tabular-nums;
        }
        .track-artist {
            font-size: 0.9em;
            color: rgba(255, 255, 255, 0.7);
        }
        .album-header {
            display: flex;
            padding: 24px;
            gap: 24px;
            align-items: flex-start;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
        }
        .album-cover-large {
            width: 200px;
            height: 200px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }
        .album-cover-large:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }
        .album-info {
            flex: 1;
        }
        .album-title-large {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 8px;
            line-height: 1.2;
        }
        .album-metadata {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
        }
        .play-button {
            opacity: 0;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.1);
        }
        .track-item:hover .play-button {
            opacity: 1;
        }
        .suggestions-wrapper {
            position: relative;
            margin: 10px 0;
        }
        .suggestions-container {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            scroll-behavior: smooth;
            gap: 10px;
            padding: 10px;
            background: var(--v-surface-variant);
            border-radius: 8px;
            max-height: 300px;
        }
        .suggestion-item {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .suggestion-item:hover {
            transform: translateY(-2px) scale(1.02);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .loader-sutil {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.2);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-left: 8px;
            vertical-align: middle;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .play-loader {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(0,0,0,0.2);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
        }
        .playlist-drawer {
            padding: 16px;
            background: #111;
        }
        .album-header {
            display: flex;
            gap: 16px;
            align-items: center;
            background: transparent;
            padding: 16px 0;
        }
        #app {
  background: #121212;
  color: #ffffff;
  min-height: 100vh;
  padding-bottom: 2rem;
  overflow-x: hidden;
}

.v-theme--dark.v-application {
  background: #121212;
  color: rgba(255, 255, 255, 0.87);
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(to bottom, 
    rgba(18, 18, 18, 0.95) 0%,
    rgba(18, 18, 18, 0.8) 50%,
    rgba(18, 18, 18, 0) 100%);
  backdrop-filter: blur(10px);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.top-nav.visible {
  transform: translateY(0);
}

.artist-name {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 0;
}

.header-search {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(18, 18, 18, 0.8);
  padding: 1rem 0;
}

.search-tabs {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
}

.artist-info-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
}

.releases-section {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 0.9;
}

.stats-section {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.stats-section::-webkit-scrollbar {
  display: none;
}

.stat-card {
  flex: 0 0 auto;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  min-width: 120px;
}

.timeline {
  position: relative;
  padding: 2rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-50%);
}

.timeline .v-chip--selected {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%) !important;
  color: white !important;
  transform: scale(1.05);
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.album-card {
  position: relative;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  opacity: 0;
  animation: albumAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.album-cover {
  position: relative;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
  transform-origin: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.vinyl-record {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: 
    linear-gradient(30deg, #000, #333),
    repeating-radial-gradient(
      circle at center,
      rgba(0,0,0,0) 0,
      rgba(0,0,0,0) 2px,
      rgba(255,255,255,0.1) 3px,
      rgba(0,0,0,0) 4px
    );
  transform: translate(-50%, -50%) scale(0.85);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 20px rgba(0,0,0,0.8),
    inset 0 0 20px rgba(255,255,255,0.1);
}

.vinyl-record.show {
  opacity: 1;
  transform: translate(-50%, -120%) scale(0.9) rotate(720deg);
  animation: vinylSpin 4s linear infinite;
}

.album-info {
  padding: 1rem 0.5rem;
}

.album-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  opacity: 0.7;
}

.filter-drawer {
  background: rgba(18, 18, 18, 0.95) !important;
  backdrop-filter: blur(20px);
}

.genres-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.genre-chip {
  background: rgba(255, 255, 255, 0.08) !important;
  transition: all 0.3s ease !important;
}

.genre-chip:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-2px);
}

@keyframes albumAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes vinylSpin {
  from {
    transform: translate(-50%, -120%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -120%) rotate(360deg);
  }
}

@media (max-width: 600px) {
  .albums-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .artist-name {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
  
  .artist-info-section,
  .releases-section {
    padding: 1rem;
    margin: 1rem 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .album-card,
  .album-cover,
  .vinyl-record,
  .top-nav {
    transition: none !important;
    animation: none !important;
  }
}


.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.artist-banner {
  position: relative;
  height: 350px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 1rem;
  background: rgba(17, 24, 39, 0.5);
}

.artist-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.artist-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.skeleton-loader {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.timeline .v-chip {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.timeline .v-chip--selected {
  background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%) !important;
  border: none;
  color: white !important;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title .v-icon {
  opacity: 0.7;
}
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    15% { opacity: 1; transform: translateY(0); }
    85% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
}
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Animación del logo */
#superaudio-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out;
}

#superaudio-logo.logo-dance {
    animation: dance 1s infinite;
}

/* Keyframes para el logo que "baila" */
@keyframes dance {
    0%, 100% {
        transform: rotate(0deg) scale(1);
    }
    25% {
        transform: rotate(15deg) scale(1.1);
    }
    50% {
        transform: rotate(-15deg) scale(1.1);
    }
    75% {
        transform: rotate(10deg) scale(1.05);
    }
}

/* Línea verde para tracks no disponibles */
#unavailable-banner {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: limegreen;
    z-index: 1000;
}

/* Tilde de cargado */
#loaded-checkmark {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
    color: green;
    z-index: 1000;
}
#interactive-player {
    transition: all 0.2s ease;
}

#interactive-player img {
    transition: transform 0.2s ease;
}

#interactive-player:hover img {
    transform: scale(1.1);
}
/* Compact Player */
#interactive-player.player {
  display: flex;
  align-items: center;
  background: #1e1e1e;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 0 10px #000;
  gap: 16px;
  margin: 20px;
}

.cover {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 6px #000;
}

.track-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.track-title {
  font-size: 1.1em;
  font-weight: bold;
  color: #ffffff;
}

.track-duration {
  font-size: 0.9em;
  color: #cccccc;
}

.audio {
  max-width: 180px;
  filter: invert(0.9);
}

/* Fullscreen Player */
.fullscreen-player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.fullscreen-cover {
  width: 60%;
  max-width: 400px;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 0 20px #000;
}

.fullscreen-audio {
  width: 80%;
  max-width: 500px;
  margin-bottom: 20px;
  filter: invert(0.9);
}

.exit-btn {
  padding: 10px 20px;
  background-color: #292929;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.exit-btn:hover {
  background-color: #444;
}
.player-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #1a1a1a;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 2px 10px #000;
}

.player-fixed.hidden {
  transform: translateY(-100%);
}

.player-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 0 5px #00bcd4;
}

.audio-fullwidth {
  flex-grow: 1;
  max-width: 60%;
  filter: invert(0.9);
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background-color: #00bcd4;
  transition: width 0.2s;
}

/* Player fijo en la parte superior */
.player-fixed {
  position: fixed;
  top: 80% !important;
  left: 0;
  right: 0;
  background: #1a1a1a;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 2px 10px #000;
}

/* Ocultar player al hacer scroll hacia abajo */
.player-fixed.hidden {
  transform: translateY(-100%);
}

.player-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: none;
}

.track-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.track-title {
  font-size: 18px;
  font-weight: bold;
}

.track-album {
  font-size: 14px;
  color: #aaa;
}

.track-duration {
  font-size: 12px;
  color: #bbb;
}

.album-cover {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.album-img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 12px;
}

.audio-fullwidth {
  flex-grow: 1;
  max-width: 60%;
  filter: invert(0.9);
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background-color: #00bcd4;
  transition: width 0.2s;
}
.album-img-b {
  margin: 0 5px;
  width: 70px;
  border-radius: 5px;
}
.play-button.loading {
    opacity: 0.7;
    pointer-events: none;
}

.play-button.loading .play-loader {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    vertical-align: middle;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.player-fixed {
    position: fixed;
    bottom: 10px; /* Cambiado a bottom */
    left: 0;
    right: 0;
    background: rgba(18, 18, 18, 0.95);
    color: #ffffff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

.player-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.track-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
}

.track-title {
    font-size: 16px;
    font-weight: bold;
}

.track-album {
    font-size: 12px;
    color: #aaa;
}

.track-duration {
    font-size: 10px;
    color: #bbb;
}
.audio-fullwidth {
  flex-grow: 1;
  max-width: 60%;
  filter: none !important;
  border-radius: 50px;
  box-shadow: darkblue 10p;
}
    </style>
</head>
<body>
   <div id="app">
        <v-app>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modulo de Audio</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body"><label for="combox-equalizer">modulo youp (activado por defecto ahora, directamente no mostraremos esta opciones.)</label>

<form name="myform">
                 <select name="master" id="combox-equalizer" size="3" aria-label="size 3 select example">
                 <option></ooption>
                    <option selected
 value="Dance" function>Activo</option>
 <option  value="Default">Apagado</option>

</select>
                </form>
                    <div class="col" style="background:#000"> 
                        <form  style="display: none !important;" id="equalizer"></form>
                    </div>
                </div>
            <div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Listo</button></div>
        </div>
    </div>
    </div>
    <div class="trosta" style="display: none ;">
        <div class="frequency">
          <canvas id="cv"></canvas>
        </div>
        <div class="toolbar">
            <div class="row">
                <div class="col">
                    <form autocomplete="off">
                        <button class="mb-3" id="play" class="btn" style="display: none !important;">Play</button>
                            <div  style="display: none !important; z-index: 9999; position: absolute;" class="file"><input type="file" id="f" accept="audio/*,video/*"></div>
                            <button  style="display: none !important;"  type="button" id="fullscreen" class="btn">Fullscreen</button>
               
                        <div class="mb-3" style="display: none !important;">
                          <label for="combox-draw">Draw</label>
                          <select id="combox-draw">
                            <option  value="0" >Line Draw</option>
                            <option value="1" >Bar Draw</option>
                          </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  
<div id="interactive-player" v-if="currentTrack" class="player-fixed">
  <!-- Logo + Info y Album -->
  <div class="player-left">
    <!-- Logo de Superaudio -->
   
     <img :src="currentTrack.artwork" alt="Album Cover" class="album-img-b" />
    <!-- Información del track y álbum -->
    <div class="track-info">
      <div class="track-title">{{ currentTrack.title }}</div>
      <div class="track-album">{{ currentTrack.albumName }}</div>
      <div class="track-duration">{{ formatDuration(currentTrack.duration) }}</div>
    </div>
  </div>

  <!-- Reproductor de Audio -->
  <audio controls class="audio-fullwidth" id="player" ref="audioRef" crossorigin="anonymous">
    <source :src="currentTrack.src" type="audio/flac" />
    Your browser does not support the audio element.
  </audio>

  <!-- Barra de Carga -->
  <div class="progress-bar" :style="{ width: progress + '%'}"></div>
</div>


 
            <!-- Top Navigation -->
            <div class="top-nav" :class="{ 'visible': showTopNav }">
                <v-container>
                    <div class="artist-name">{{ topArtist.name }}</div>
                </v-container>
            </div>

            <!-- Search Header -->
            <div class="header-search">
                <v-container>
                    <v-tabs v-model="activeTab" class="search-tabs" color="primary" align-tabs="center">
                        <v-tab value="artist"><v-icon>mdi-account-music</v-icon> Artist</v-tab>
                        <v-tab value="albums"><v-icon>mdi-album</v-icon> Albums</v-tab>
                        <v-tab value="tracks"><v-icon>mdi-playlist-music</v-icon> Tracks</v-tab>
                    </v-tabs>

                    <!-- Search Field -->
                    <v-text-field
                        v-model="search"
                        class="mt-2"
                        label="Search..."
                        hide-details
                        append-inner-icon="mdi-magnify"
                        @input="fetchArtistSuggestions"
                        @click:append-inner="fetchArtistData"
                        @keyup.enter="fetchArtistData"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <!-- Artist Suggestions -->
                    <div v-if="artistSuggestions.length > 0" class="suggestions-wrapper">
                        <v-btn
                            v-show="canScrollLeft"
                            icon="mdi-chevron-left"
                            size="small"
                            class="scroll-button left"
                            @click="scrollSuggestions('left')"
                        ></v-btn>

                        <div class="suggestions-container" ref="suggestionsContainer">
                            <div
                                v-for="(artist, index) in artistSuggestions"
                                :key="index"
                                class="suggestion-item"
                                @click="selectArtist(artist)"
                            >
                                <v-avatar size="30">
                                    <v-img
                                        :src="artist.image || `https://placehold.co/30x30/gray/white?text=${artist.sort_name[0]}`"
                                        cover
                                    ></v-img>
                                </v-avatar>
                                <div class="suggestion-content">
                                    <div class="suggestion-name">{{ artist.sort_name }}</div>
                                    <div class="suggestion-type">Artist</div>
                                </div>
                            </div>
                        </div>

                        <v-btn
                            v-show="canScrollRight"
                            icon="mdi-chevron-right"
                            size="small"
                            class="scroll-button right"
                            @click="scrollSuggestions('right')"
                        ></v-btn>
                    </div>
                </v-container>
            </div>


            <!-- Main Content -->
            <v-container>
                <!-- Artist Banner -->
                <div class="artist-banner" v-if="artistImage">
                    <v-img
                        :src="artistImage"
                        :lazy-src="artistImage"
                        cover
                        height="100%"
                    >
                        <template v-slot:placeholder>
                            <v-skeleton-loader
                                class="skeleton-loader"
                                type="image"
                                height="100%"
                            ></v-skeleton-loader>
                        </template>
                    </v-img>
                </div>

                <!-- Content Wrapper -->
                <v-fade-transition>
                    <div v-if="topArtist && topArtist.releases && topArtist.releases.length > 0" class="content-wrapper">
                        <!-- Artist Info Section -->
                        <div class="artist-info-section" v-if="topArtist.description">
                            <h2 class="text-h5 mb-4">About</h2>
                            <p class="text-body-1">{{ topArtist.description }}</p>
                        </div>

                        <!-- Releases Section -->
                        <div class="releases-section mt-6">
                            <div class="d-flex align-center justify-space-between mb-4">
                                <h2 class="text-h5">Releases ({{ totalReleases }})</h2>
                                <v-btn icon="mdi-filter-variant" @click="showFilters = true"></v-btn>
                            </div>
                            
                            <div v-if="filteredReleases.length > 0" class="albums-grid">
                                <div
                                    v-for="(release, index) in filteredReleases"
                                    :key="release.id"
                                    class="album-card"
                                    :style="{ 'animation-delay': `${index * 0.1}s` }"
                                    @mouseenter="handleMouseEnter(index)"
                                    @mouseleave="handleMouseLeave"
                                    @click="handleAlbumClick(release)"
                                >
                                    <div class="album-cover" style="position: relative;">
                                        <v-img
                                            :src="release.artwork?.[0]?.thumbnails?.small || `https://placehold.co/300x300/gray/white?text=${release.title}`"
                                            cover
                                            aspect-ratio="1"
                                        >
                                            <template v-slot:placeholder>
                                                <v-skeleton-loader type="image" />
                                            </template>
                                        </v-img>
                                        <div class="vinyl-record" :class="{ 'show': showVinyl === index }"></div>
                                        <div class="album-type-label">
                                            {{ getTypeLabel(release.type) }}
                                        </div>
                                    </div>
                                    <div class="album-info">
                                        <div class="album-title">{{ release.title }}</div>
                                        <div class="album-year">
                                            {{ formatDate(release["first-release-date"]) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center pa-4">
                                No releases found matching your criteria.
                            </div>
                        </div>
                    </div>
                    <div v-else-if="isLoading" class="text-center pa-4">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                    <div v-else class="text-center pa-4">
                        {{ message }}
                    </div>
                </v-fade-transition>
            </v-container>

            <!-- Filter Dialog -->
            <v-dialog v-model="showFilters" max-width="400">
                <v-card class="pa-4">
                    <v-card-title>Filter Albums</v-card-title>
                    <v-text-field
                        v-model="albumSearch"
                        label="Search albums"
                        prepend-icon="mdi-magnify"
                        variant="outlined"
                        density="comfortable"
                        clearable
                        @input="updateFilters"
                    ></v-text-field>
                    <v-select
                        v-model="selectedYears"
                        :items="availableYears"
                        label="Filter by year"
                        multiple
                        chips
                        closable-chips
                        :loading="!availableYears.length"
                        :disabled="!availableYears.length"
                        @change="updateFilters"
                    ></v-select>
                    
                    <div class="text-caption mb-2">
                        Showing {{ filteredReleases.length }} of {{ totalReleases }} releases
                    </div>
                    
                    <v-card-actions>
                        <v-btn @click="resetFilters" text>Reset</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="showFilters = false">Done</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Playlist Dialog -->
            <v-dialog v-model="showPlaylist" max-width="800" transition="dialog-bottom-transition">
                <v-card class="playlist-drawer" v-if="selectedAlbum.title">
                    <div class="album-header">
                        <div class="album-cover-large">
                            <v-img
                                :src="selectedAlbum.artwork?.[0]?.thumbnails?.large"
                                :lazy-src="selectedAlbum.artwork?.[0]?.thumbnails?.small"
                                cover
                                aspect-ratio="1"
                            >
                                <template v-slot:placeholder>
                                    <v-skeleton-loader type="image" />
                                </template>
                            </v-img>
                        </div>
                        <div class="album-info">
                            <div class="album-title-large">{{ selectedAlbum.title }}</div>
                            <div class="album-metadata">
                                <div class="text-h6">{{ selectedAlbum.artist }}</div>
                                <div>{{ selectedAlbum.tracks?.length || 0 }} tracks</div>
                                <div>Total duration: {{ formatTotalDuration }}</div>
                            </div>
                        </div>
                    </div>

                    <v-divider></v-divider>

    <v-list-item
        v-for="track in selectedAlbum.tracks"
        :key="track.id"
        class="track-item"
    >
        <template v-slot:prepend>
            <div class="track-number">{{ track.number }}.</div>
        </template>
        <v-list-item-title>{{ track.name }}</v-list-item-title>
        <template v-slot:append>
            <div class="track-duration me-4">
                {{ formatDuration(track.length) }}
            </div>
            <v-btn
                icon
                size="small"
                variant="text"
                class="play-button"
                @click.stop="playTrack(track)"
            >
                <span v-if="trackLoading === track.id" class="play-loader"></span>
                <v-icon v-else>
                    {{ track.storage ? 'mdi-play' : 'mdi-cloud-download-outline' }}
                </v-icon>
            </v-btn>
        </template>
    </v-list-item>
</v-list>


                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="showPlaylist = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

      </v-app> 

      <!-- Reproductor base -->

    
<script>

</script>
 <script type="importmap">
        {
        "imports": {
            "vue": "https://www.unpkg.com/vue@3.5.13/dist/vue.esm-browser.js",
            "vuetify": "https://cdnjs.cloudflare.com/ajax/libs/vuetify/3.6.9/vuetify.esm.min.js"
        }
    }
    </script>
    <script type="module">
 
        function normalizeString(str) {
            return str.normalize("NFD")
                     .replace(/[\u0300-\u036f]/g, "")
                     .toLowerCase()
                     .replace(/[^a-z0-9]/g, "");
        }

        function formatTrackNumber(num) {
            const parsed = parseInt(num, 10);
            return parsed < 10 ? `0${parsed}` : `${parsed}`;
        }

        import { createApp, ref, computed, onMounted } from "vue";
        import { createVuetify } from "vuetify";

        const vuetify = createVuetify({
            theme: {
                defaultTheme: 'dark'
            }
        });

        // Define CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        const app = createApp({
            setup() {
                const search = ref("");
                const artists = ref([]);
                const artistSuggestions = ref([]);
                const artistImageMap = ref({});
                const topArtist = ref({});
                const isLoading = ref(false);
                const message = ref("Search for an artist...");
                const activeTab = ref("artist");
                const showDetails = ref(false);
                const showFilters = ref(false);
                const albumSearch = ref('');
                const selectedYears = ref([]);
                const showVinyl = ref(false);
                const showTopNav = ref(false);
                const artistImage = ref('');
                const currentUser = ref('xearstevejobs');
                const currentTime = ref('2025-04-10 19:51:39');
                const showPlaylist = ref(false);
                const selectedAlbum = ref({});
                const suggestionsContainer = ref(null);
                const canScrollLeft = ref(false);
                const canScrollRight = ref(false);
                const currentTrack = ref(null);
const isFullScreen = ref(false);
const trackLoading = ref(null);
                const totalReleases = computed(() => {
                    return topArtist.value?.releases?.length || 0;
                });

                const availableYears = computed(() => {
                    const years = topArtist.value?.releases?.map(release => 
                        new Date(release["first-release-date"]).getFullYear()
                    ) || [];
                    return [...new Set(years)].sort((a, b) => b - a);
                });

                const filteredReleases = computed(() => {
                    let releases = topArtist.value?.releases || [];
                    
                    if (albumSearch.value) {
                        releases = releases.filter(release => 
                            release.title.toLowerCase().includes(albumSearch.value.toLowerCase())
                        );
                    }

                    if (selectedYears.value.length > 0) {
                        releases = releases.filter(release => 
                            selectedYears.value.includes(
                                new Date(release["first-release-date"]).getFullYear()
                            )
                        );
                    }

                    return releases;
                });

                const formatTotalDuration = computed(() => {
                    if (!selectedAlbum.value.tracks) return '0:00';
                    const totalMs = selectedAlbum.value.tracks.reduce((acc, track) => acc + (track.length || 0), 0);
                    return formatDuration(totalMs);
                });

                function getTypeLabel(type) {
                    const types = {
                        1: 'Album',
                        2: 'Single',
                        3: 'EP',
                        4: 'Compilation',
                        5: 'Soundtrack',
                        6: 'Live',
                        7: 'Remix',
                        8: 'Other'
                    };
                    return types[type] || 'Unknown';
                }

                function formatDate(date) {
                    if (!date) return 'Unknown date';
                    return new Date(date).getFullYear();
                }

                function formatDuration(ms) {
                    if (!ms) return '0:00';
                    const minutes = Math.floor(ms / 60000);
                    const seconds = ((ms % 60000) / 1000).toFixed(0);
                    return `${minutes}:${seconds.padStart(2, '0')}`;
                }

                function scrollSuggestions(direction) {
                    const container = suggestionsContainer.value;
                    const scrollAmount = 300;
                    if (container) {
                        if (direction === 'left') {
                            container.scrollLeft -= scrollAmount;
                        } else {
                            container.scrollLeft += scrollAmount;
                        }
                        updateScrollButtons();
                    }
                }

                function updateScrollButtons() {
                    const container = suggestionsContainer.value;
                    if (container) {
                        canScrollLeft.value = container.scrollLeft > 0;
                        canScrollRight.value = container.scrollLeft < (container.scrollWidth - container.clientWidth);
                    }
                }

let debounceTimer; // Variable para manejar el debounce

async function fetchArtistSuggestions() {
    // Limpiar el timer anterior si existe
    clearTimeout(debounceTimer);

    // Validar longitud mínima de búsqueda (al menos 2 caracteres)
    if (search.value.length < 2) {
        artistSuggestions.value = [];
        return;
    }

    // Usar debounce para evitar múltiples solicitudes rápidas
    debounceTimer = setTimeout(async () => {
        try {
            let queryType = activeTab.value; // Obtener el tipo de búsqueda según la pestaña activa
            let endpoint = '';

            // Determinar el endpoint según el tipo de búsqueda
            switch (queryType) {
                case 'artist':
                    endpoint = `https://paymentsup.superaudio.online/search.php?query=${encodeURIComponent(search.value)}&type=artist&page=1`;
                    break;
                case 'albums':
                    endpoint = `https://paymentsup.superaudio.online/search.php?query=${encodeURIComponent(search.value)}&type=album&page=1`;
                    break;
                case 'tracks':
                    endpoint = `https://paymentsup.superaudio.online/search.php?query=${encodeURIComponent(search.value)}&type=track&page=1`;
                    break;
                default:
                    console.error("Tipo de búsqueda no reconocido");
                    return;
            }

            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include', // Incluir credenciales
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: 'cors' // Especificar modo CORS
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Procesar las sugerencias según el tipo de búsqueda
            if (queryType === 'albums') {
                // Para álbumes, incluir el nombre del álbum y el artista
                artistSuggestions.value = (data.results || []).map(album => ({
                    id: album.id,
                    title: album.title,
                    artist: album.artist_name,
                    image: album.image || null,
                    type: 'album'
                }));
            } else if (queryType === 'tracks') {
                // Para tracks, incluir el nombre del track y el artista
                artistSuggestions.value = (data.results || []).map(track => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artist_name,
                    image: track.image || null,
                    type: 'track'
                }));
            } else {
                // Para artistas, mantener el formato original
                artistSuggestions.value = data.results || [];
            }

            // Ajustar el contenedor de sugerencias
            if (suggestionsContainer.value) {
                suggestionsContainer.value.scrollLeft = 0;
                updateScrollButtons();
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            artistSuggestions.value = [];
        }
    }, 300); // Retraso de 300ms para el debounce
}
                async function fetchLastFmArtistImage(artistName) {
                    try {
                        const response = await fetch(
                            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=040185975d76d4a958f22976bf645b3a&format=json`,
                            { headers: corsHeaders }
                        );
                                                const data = await response.json();
                        const images = data.artist?.image || [];
                        const largeImage = images.find(img => img.size === 'extralarge' || img.size === 'mega');
                        return largeImage?.['#text'] || null;
                    } catch (error) {
                        console.error('Error fetching Last.fm image:', error);
                        return null;
                    }
                }

                async function fetchArtistReleases(artistId) {
                    try {
                        const response = await fetch(
                            `https://paymentsup.superaudio.online/search/release-groupv1.php?id=${artistId}`,
                            {
                method: 'GET',
                credentials: 'include', // Incluir credenciales
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Agregar cualquier header de autorización si es necesario
                    // 'Authorization': 'Bearer your-token'
                },
                mode: 'cors' // Especificar modo CORS
            }
                        );
                        const data = await response.json();
                        
                        if (data.status === 'success' && Array.isArray(data.releases)) {
                            return data.releases;
                        }
                        return [];
                    } catch (error) {
                        console.error("Error fetching releases:", error);
                        return [];
                    }
                }

                async function fetchArtistData() {
                    try {
                        isLoading.value = true;
                        message.value = "Searching...";
                        
                        const response = await fetch(
                            `https://paymentsup.superaudio.online/search.php?query=${encodeURIComponent(search.value)}&type=artist&page=1`,
                            { headers: corsHeaders }
                        );
                        
                        const data = await response.json();
                        artists.value = data.results || [];

                        if (artists.value.length > 0) {
                            topArtist.value = artists.value[0];
                            
                            const [description, releases, image] = await Promise.all([
                                fetchWikipediaExtract(search.value),
                                fetchArtistReleases(topArtist.value.id),
                                fetchLastFmArtistImage(search.value)
                            ]);

                            topArtist.value.description = description;
                            topArtist.value.releases = releases;
                            artistImage.value = image;
                            
                            selectedYear.value = null;
                            selectedYears.value = [];
                            albumSearch.value = '';
                        } else {
                            message.value = "No artists found.";
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        message.value = "Error loading data. Please try again.";
                    } finally {
                        isLoading.value = false;
                    }
                }

                async function fetchWikipediaExtract(searchTerm) {
                    try {
                        const response = await fetch(
                            `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=hastemplate:Infobox_musical_artist+${encodeURIComponent(searchTerm)}`,
                            
                        );
                        const data = await response.json();
                        if (!data.query?.search?.[0]) return "";
                        
                        const artist = data.query.search[0];
                        const extractResponse = await fetch(
                            `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&pageids=${artist.pageid}&origin=*`,
                           
                        );
                        const extractData = await extractResponse.json();
                        return Object.values(extractData.query.pages)[0]?.extract || "";
                    } catch (error) {
                        console.error("Error fetching Wikipedia data:", error);
                        return "";
                    }
                }

async function selectArtist2(artist) {
    try {
        search.value = artist.sort_name;
        artistSuggestions.value = [];
        
        const response = await fetch(
            `https://paymentsup.superaudio.online/search/release-groupv1.php?id=${artist.id}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );
        
        const data = await response.json(); // Remove the [] - this is the error
        
        if (data.status === 'success' && data.releases) {
            topArtist.value = {
                ...artist,
                releases: data.releases,
                id: data.artist?.id || artist.id,
                name: data.artist?.name || artist.sort_name
            };
            
            const [description, image] = await Promise.all([
                fetchWikipediaExtract(artist.sort_name),
                fetchLastFmArtistImage(artist.sort_name)
            ]);
            
            topArtist.value = {
                ...topArtist.value,
                description,
                tags: data.artist?.tags || [], 
            };
            artistImage.value = image;
            
            selectedYears.value = [];
            albumSearch.value = '';

            if (filteredReleases.value.length > 0) {
                message.value = '';
            } else {
                message.value = 'No releases found for this artist.';
            }
        } else {
            console.error("Invalid response data:", data);
            message.value = "Error loading artist data. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching artist data:", error);
        message.value = "Error loading artist data. Please try again.";
    }
}
async function selectArtist(artist) {
    try {
        search.value = artist.sort_name;
        artistSuggestions.value = [];
        isLoading.value = true;  // Add this line to show loading state
        
        const response = await fetch(
            `https://paymentsup.superaudio.online/search/release-groupv1.php?id=${artist.id}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );
        
        const data = await response.json();
        
        if (data.status === 'success' && data.releases) {
            // Update artist information first
            topArtist.value = {
                ...artist,
                releases: data.releases,
                id: data.artist?.id || artist.id,
                name: data.artist?.name || artist.sort_name
            };
            
            // Fetch additional information
            const [description, image] = await Promise.all([
                fetchWikipediaExtract(artist.sort_name),
                fetchLastFmArtistImage(artist.sort_name)
            ]);
            
            // Update with additional information
            topArtist.value = {
                ...topArtist.value,
                description,
                tags: data.artist?.tags || [], 
            };
            artistImage.value = image;
            
            // Reset filters
            selectedYears.value = [];
            albumSearch.value = '';
            
            // Clear message if we have releases
            if (data.releases && data.releases.length > 0) {
                message.value = '';
            } else {
                message.value = 'No releases found for this artist.';
            }
            
            // Update artists array
            artists.value = [topArtist.value];
        } else {
            console.error("Invalid response data:", data);
            message.value = "Error loading artist data. Please try again.";
        }
    } catch (error) {
        console.error("Error fetching artist data:", error);
        message.value = "Error loading artist data. Please try again.";
    } finally {
        isLoading.value = false;  // Add this line to hide loading state
    }
}

                function handleMouseEnter(index) {
                    showVinyl.value = index;
                }

                function handleMouseLeave() {
                    showVinyl.value = null;
                }



// Función para mostrar la notificación de carga
function showLoadingNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2196F3;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <div class="loading-spinner" style="margin-right: 10px;"></div>
            <div>
                <div style="margin-bottom: 8px;">Cargando álbum...</div>
                <small style="display: block; opacity: 0.9;">
                    Por favor espere...
                </small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    return notification;
}

// Función para mostrar la notificación de éxito
function showSuccessNotification({ title, timestamp, user, trackCount }) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    notification.innerHTML = `
        <div style="margin-bottom: 8px;">
            ✓ ¡Álbum "${title}" cargado con éxito!</div>
        <small style="display: block; opacity: 0.9;">
            Time: ${timestamp}<br>
            User: ${user}<br>
            Tracks: ${trackCount}
        </small>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function displayTrackNotFoundMessage(message = 'Track not found') {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 1);
    }
}



// Animación del logo mientras se reproduce la música
function startLogoAnimation() {
    const logo = document.getElementById('superaudio-logo');
    if (!logo) return;

    // Agregar clase para animación
    logo.classList.add('logo-dance');

    currentAudio.addEventListener('ended', () => {
        logo.classList.remove('logo-dance');
    });
}

// Mostrar línea verde para tracks no disponibles
function showUnavailableTrackBanner() {
    const banner = document.getElementById('unavailable-banner');
    if (!banner) return;

    banner.style.display = 'block';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 3);
}

// Mostrar el tilde de cargado
function showLoadedCheckmark() {
    const checkmark = document.getElementById('loaded-checkmark');
    if (!checkmark) return;

    checkmark.style.display = 'block';
    setTimeout(() => {
        checkmark.style.display = 'none';
    }, 2);
}
// Función auxiliar para mostrar el tilde de cargado
function showLoadedCheckmark() {
    // Asumiendo que tienes un elemento para mostrar el tilde
    const checkmark = document.querySelector('.track-loaded-checkmark');
    if (checkmark) {
        checkmark.style.display = 'block';
        // Ocultar el tilde después de 2 segundos
        setTimeout(() => {
            checkmark.style.display = 'none';
        }, 2);
    }
}
// Función para mostrar la notificación de error
function showErrorNotification(errorMessage) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #f44336;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    notification.innerHTML = `
        <div style="margin-bottom: 8px;">
            ❌ Error al cargar el álbum</div>
        <small style="display: block; opacity: 0.9;">
            Time: ${new Date().toISOString()}<br>
            User: xearstevejobs<br>
            Error: ${errorMessage}
        </small>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
// Función auxiliar para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Función auxiliar adicional
function showProcessingMessage() {
    // Mostrar mensaje de que los tracks están siendo procesados
}


// Función auxiliar adicional
function showProcessingMessage() {
    // Mostrar mensaje de que los tracks están siendo procesados
}





function createNotification({ message, type = 'info', icon = '', duration = null }) {
    const notificationEl = document.createElement('div');
    notificationEl.className = `notification notification-${type}`;
    notificationEl.innerHTML = `${icon} ${message}`;
    document.body.appendChild(notificationEl);

    return {
        remove: () => notificationEl.remove(),
        update: ({ message, type, icon, duration }) => {
            if (message) notificationEl.innerHTML = `${icon || ''} ${message}`;
            if (type) notificationEl.className = `notification notification-${type}`;
            if (duration) {
                setTimeout(() => notificationEl.remove(), duration);
            }
        }
    };
}
async function handleAlbumClick(release) {
    try {
        // Mostrar un indicador de carga mientras se realiza la solicitud
        isLoading.value = true;

        // Solicitar detalles del álbum
        const releaseResponse = await fetch(
            `https://paymentsup.superaudio.online/search/releasev1.php?id=${release.id}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );

        // Parsear la respuesta
        const releaseData = await releaseResponse.json();

        // Validar la estructura de la respuesta
        if (releaseData.status === "success" && releaseData.release && releaseData.tracks) {
            // Actualizar el estado del álbum seleccionado en Vue.js
            selectedAlbum.value = {
                title: releaseData.release.title,
                artist: releaseData.release.artist.name,
                artwork: releaseData.release.artwork,
                tracks: releaseData.tracks.map(track => ({
                    id: track.id,
                    gid: track.gid,
                    name: track.name,
                    number: track.number,
                    length: track.length,
                    src: track.src,
                    storage: track.storage === "true", // Convertir string a booleano
                    artistname: releaseData.release.artist.name,
                    albumname: releaseData.release.title
                }))
            };

            // Mostrar el diálogo del playlist
            showPlaylist.value = true;
        } else {
            throw new Error(
                `Formato de respuesta inválido: ${JSON.stringify(releaseData)}`
            );
        }
    } catch (error) {
        // Manejar errores
        console.error("Error al cargar el playlist:", error);
        alert("Hubo un error al cargar el playlist. Por favor, intente nuevamente.");
    } finally {
        // Ocultar el indicador de carga
        isLoading.value = false;
    }
}

async function showDownloadIcon(track) {
    const timestamp = '2025-04-15 23:11:31';
    const user = 'xearstevejobs';
    const baseUrl = 'https://paymentsup.superaudio.online/search/';

    try {
        // Activar estado visual de descarga
        track.isDownloading = true;
        
        // Preparar los datos para getting.php
        const artistNoSpaces = track.artist.replace(/\s+/g, '');
        const albumNoSpaces = track.album.replace(/\s+/g, '');
        const resting = `${artistNoSpaces}/${albumNoSpaces}/${track.track_number}`;

        // Emitir evento para actualizar UI
        emit('track:downloadStarted', {
            trackId: track.id,
            timestamp,
            user
        });

        // Mostrar notificación de inicio
        showNotification(`Iniciando descarga: ${track.name}`, 'info');

        // Realizar la primera consulta a getting.php
        const response = await fetch(
            `${baseUrl}gettingv1.php?id=${track.id}&resting=${encodeURIComponent(resting)}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (data.flac_url && data.cover_url) {
            // Guardar las URLs en el track
            track.flac_url = data.flac_url;
            track.cover_url = data.cover_url;
            
            // Si el estado es charged, actualizar storage
            if (data.superstatus === 'chargued') {
                track.storage = true;
                updateTrackStorageStatus(track.id, true);
                showNotification(`${track.name} está listo para reproducir`, 'success');
            } else {
                // Iniciar monitoreo de estado
                startStatusCheck(track);
                showNotification(`Procesando ${track.name}...`, 'info');
            }

            return {
                status: 'success',
                data: data,
                timestamp,
                user
            };
        } else {
            throw new Error('Invalid response from getting.php');
        }
    } catch (error) {
        console.error('Error in showDownloadIcon:', error);
        
        // Desactivar estado de descarga
        track.isDownloading = false;
        
        // Notificar error
        showNotification(`Error iniciando descarga de ${track.name}`, 'error');
        
        return {
            status: 'error',
            error: error.message,
            timestamp,
            user
        };
    }
}

// Función auxiliar para monitorear el estado
function startStatusCheck(track) {
    const baseUrl = 'https://paymentsup.superaudio.online/search/';
    
    // Crear elemento visual de progreso
    const progressElement = document.createElement('div');
    progressElement.id = `download-progress-${track.id}`;
    progressElement.className = 'download-progress';
    progressElement.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Procesando...</div>
    `;

    // Agregar estilos
    const style = document.createElement('style');
    style.textContent = `
        .download-progress {
            position: relative;
            padding: 8px;
            background: rgba(var(--v-theme-primary), 0.1);
            border-radius: 4px;
            margin: 4px 0;
        }

        .progress-bar {
            height: 4px;
            background: rgba(var(--v-theme-primary), 0.2);
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: var(--v-theme-primary);
            width: 0%;
            transition: width 0.3s ease;
        }

        .progress-text {
            font-size: 0.75rem;
            color: var(--v-theme-primary);
            margin-top: 4px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    // Insertar elemento en el DOM
    const trackElement = document.querySelector(`#track-${track.id}`);
    if (trackElement) {
        trackElement.appendChild(progressElement);
    }

    // Iniciar chequeo periódico
    let checkCount = 0;
    const maxChecks = 30;

    const checkInterval = setInterval(async () => {
        checkCount++;

        try {
            const response = await fetch(`${baseUrl}check-status.php?id=${track.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const statusData = await response.json();

            // Actualizar barra de progreso
            const progressFill = progressElement.querySelector('.progress-fill');
            const progressText = progressElement.querySelector('.progress-text');
            
            if (statusData.status === 100 || statusData.completed) {
                // Proceso completado
                clearInterval(checkInterval);
                track.storage = true;
                updateTrackStorageStatus(track.id, true);
                
                progressFill.style.width = '100%';
                progressText.textContent = 'Listo para reproducir';
                
                // Eliminar elemento de progreso después de un momento
                setTimeout(() => {
                    progressElement.remove();
                }, 2000);
                
                showNotification(`${track.name} está listo para reproducir`, 'success');
            } else {
                // Actualizar progreso
                const progress = statusData.status || (checkCount * 3.33);
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `Procesando: ${Math.round(progress)}%`;
            }

            // Verificar si se excedió el número máximo de intentos
            if (checkCount >= maxChecks) {
                clearInterval(checkInterval);
                progressText.textContent = 'Tiempo de espera excedido';
                showNotification(`Tiempo de espera excedido para ${track.name}`, 'warning');
            }
        } catch (error) {
            console.error('Error checking status:', error);
            checkCount++;
        }
    }, 2000);
}

async function startodisea(track) {
    const baseUrl = 'https://paymentsup.superaudio.online/search/';
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    try {
        // Prepare track parameters
        const artistNoSpaces = track.artistname.replace(/\s+/g, '');
        const albumNoSpaces = track.albumname.replace(/\s+/g, '');
        const resting = `${artistNoSpaces}/${albumNoSpaces}/${track.number}`;

        // Show loading animation
        showLoaderAnimation();

        // First request to getting.php
        const gettingResponse = await fetch(
            `${baseUrl}gettingv1.php?id=${track.id}&resting=${encodeURIComponent(resting)}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        const gettingData = await gettingResponse.json();

        if (!gettingData.flac_url || !gettingData.cover_url) {
            throw new Error('Invalid response from getting.php');
        }

        // Store URLs
        track.flac_url = gettingData.flac_url;
        track.cover_url = gettingData.cover_url;

        // Update cover if available
        if (track.cover_url) {
            updateCover(track.cover_url);
        }

        // If already charged, update storage status and return
        if (gettingData.superstatus === 'chargued') {
            track.storage = true;
            track.src = track.flac_url;
            updateTrackStorageStatus(track.id, true);
            hideLoaderAnimation();
            showNotification(`${track.name} está listo para reproducir`, 'success');
            return track;
        }

        // Start checking status
        let checkCount = 0;
        const maxChecks = 30;
        const checkInterval = 2000; // 2 seconds

        return new Promise((resolve, reject) => {
            const statusChecker = setInterval(async () => {
                try {
                    checkCount++;

                    const statusResponse = await fetch(
                        `${baseUrl}check-status.php?id=${track.id}`,
                        {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Accept': 'application/json'
                            }
                        }
                    );

                    const statusData = await statusResponse.json(); 

                    // Update progress in UI
                    const progress = statusData.status || (checkCount * 3.33);
                    updateDownloadProgress(track.id, progress);

                    if (statusData.percentage === 100) {
                        clearInterval(statusChecker);
                        console.log(statusData.status);
                        console.log(statusData.percentage);

                        track.storage = true;
                        track.src = track.flac_url;
                        updateTrackStorageStatus(track.id, true);
                        hideLoaderAnimation();
                        showNotification(`${track.name} está listo para reproducir`, 'success');
                        resolve(track);
                        return;
                    }

                    // Check if maximum attempts reached
                    if (checkCount >= maxChecks  && statusData.percentage < 100) {
                        clearInterval(statusChecker);
                        hideLoaderAnimation();
                        showNotification(`Tiempo de espera excedido para ${track.name}`, 'warning');
                        reject(new Error('Timeout checking track status'));
                        return;
                    }

                } catch (error) {
                    clearInterval(statusChecker);
                    hideLoaderAnimation();
                    showNotification(`Error procesando ${track.name}`, 'error');
                    reject(error);
                }
            }, checkInterval);
        });

    } catch (error) {
        hideLoaderAnimation();
        showNotification(`Error iniciando descarga de ${track.name}`, 'error');
        console.error('Error in startodisea:', error);
        throw error;
    }
}

// Funciones auxiliares que necesitarás implementar:
function showDownloadIcon() {
    // Mostrar icono de descarga en la interfaz
}

function updateNowPlayingInfo(track) {
    // Actualizar información de reproducción actual
    // (título, artista, álbum, etc.)
}

function startProcessingAnimation() {
    // Mostrar animación de procesamiento
}

function updateTrackStorageStatus(trackId, status) {
    const trackElement = document.querySelector(`[data-track-id="${trackId}"]`);
    if (trackElement) {
        // Cambiar el ícono de descarga por el de reproducción
        const playButton = trackElement.querySelector('.play-button');
        if (status) {
            playButton.innerHTML = '<v-icon>mdi-play</v-icon>';
            playButton.classList.remove('loading');
        } else {
            playButton.innerHTML = '<v-icon>mdi-cloud-download-outline</v-icon>';
        }
    }

    // Actualizar el estado interno del track
    selectedAlbum.value.tracks.forEach(track => {
        if (track.id === trackId) {
            track.storage = status;
        }
    });
}


async function handleAlbumClick(release) {
    try {
        // Solicitud para obtener detalles del release
        const releaseResponse = await fetch(
            `https://paymentsup.superaudio.online/search/releasev1.php?id=${release.id}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        );
        const releaseData = await releaseResponse.json();

        if (releaseData.status === "success" && releaseData.release && releaseData.tracks) {
            // Configurar el álbum seleccionado (actualiza el estado en Vue.js)
            selectedAlbum.value = {
                title: releaseData.release.title,
                artist: releaseData.release.artist.name,
                artwork: releaseData.release.artwork,
                tracks: releaseData.tracks.map(track => ({
                    id: track.id,
                    gid: track.gid,
                    name: track.name,
                    number: track.number,
                    length: track.length,
                    src: track.src,
                    storage: track.storage === "true", // Convertir string a booleano
                    artistname: releaseData.release.artist.name,
                    albumname: releaseData.release.title
                }))
            };

            // Mostrar el diálogo del playlist
            showPlaylist.value = true;
        } else {
            throw new Error("Formato de respuesta inválido");
        }
    } catch (error) {
        console.error("Error al cargar el playlist:", error);
        alert("Hubo un error al cargar el playlist. Por favor, intente nuevamente.");
    }
}

// Helper function to update download progress in UI
function updateDownloadProgress(trackId, progress) {
    const progressElement = document.querySelector(`#download-progress-${trackId} .progress-fill`);
    const progressText = document.querySelector(`#download-progress-${trackId} .progress-text`);
    
    if (progressElement && progressText) {
        progressElement.style.width = `${progress}%`;
        progressText.textContent = `Procesando: ${Math.round(progress)}%`;
    }
}
 // Función para reproducir un track
    function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 60px; right: 20px;
        background: ${type === 'info' ? '#2196F3' : type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 1001;
        animation: fadeInOut 2s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}           
 
let playbackQueue = [];
let isPlaying = false;

function enqueueTrack(track) {
    if (!track.storage) {
        startodisea(track).then(updatedTrack => {
            playbackQueue.push(updatedTrack);
            handlePlaybackQueue();
        });
    } else {
        playbackQueue.push(track);
        handlePlaybackQueue();
    }
}

function handlePlaybackQueue() {
    if (isPlaying || playbackQueue.length === 0) return;

    const nextTrack = playbackQueue.shift();
    if (nextTrack) {
        isPlaying = true;
        playTrack(nextTrack).then(() => {
            isPlaying = false;
            handlePlaybackQueue();
        });
    }
}

async function playTrack(track) {
    try {
        if (!track.src) {
            await startodisea(track); // Procesa el track si no está disponible
        }

        // Actualizar el track actual
        currentTrack.value = {
            title: track.name,
            artwork: track.artwork?.[0]?.thumbnails?.large || track.cover_url,
            src: track.src || track.flac_url,
            duration: track.length,
            albumName: track.albumname,
            artistName: track.artistname
        };

        // Actualizar el reproductor minimalista
        const playerInfo = document.querySelector('.player-left .track-info');
        if (playerInfo) {
            playerInfo.innerHTML = `
                <div class="track-title">${track.name}</div>
                <div class="track-album">${track.albumname}</div>
                <div class="track-duration">${formatDuration(track.length)}</div>
            `;
        }

        // Obtener el reproductor de audio
        const audio = document.getElementById('player');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.src = track.src;
            audio.load();
            await audio.play();
           
        }
         fullspectrum();
    } catch (error) {
        console.error("Error al reproducir el track:", error);
        showNotification("No se pudo reproducir el track", "error");
    }
}

                // Función para salir del modo pantalla completa
                function exitFullScreen() {
                    isFullScreen.value = false;
                }

                // Formatear duración
                function formatDuration(ms) {
                    const minutes = Math.floor(ms / 60000);
                    const seconds = ((ms % 60000) / 1000).toFixed(0);
                    return `${minutes}:${seconds.padStart(2, '0')}`;
                }



                function showLoaderAnimation() {
                    if (!document.getElementById('loaderAnimation')) {
                        const loader = document.createElement('img');
                        loader.src = "https://superaudio.online/logo.svg";
                        loader.id = "loaderAnimation";
                        loader.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100px;
                            height: 100px;
                            z-index: 9999;
                            animation: swing-spin 1.5s ease-in-out infinite;
                        `;
                        document.body.appendChild(loader);

                        const style = document.createElement('style');
                        style.innerHTML = `
                            @keyframes swing-spin {
                                0%   { transform: translate(-50%, -50%) rotate(0deg); }
                                20%  { transform: translate(-50%, -50%) rotate(30deg); }
                                40%  { transform: translate(-50%, -50%) rotate(-25deg); }
                                60%  { transform: translate(-50%, -50%) rotate(15deg); }
                                80%  { transform: translate(-50%, -50%) rotate(-10deg); }
                                100% { transform: translate(-50%, -50%) rotate(0deg); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }

                function hideLoaderAnimation() {
                    const loader = document.getElementById('loaderAnimation');
                    if (loader) loader.remove();
                }

                function updateCover(coverUrl) {
                    const cover = document.getElementById('albumCover');
                    if (cover) {
                        cover.src = coverUrl;
                        cover.style.display = 'block';
                    }
                }

                function displayTrackNotFoundMessage() {
                    alert("disco poara subir automatizado, proximo paso...");
                }

                onMounted(() => {
                    window.addEventListener('scroll', () => {
                        showTopNav.value = window.scrollY > 300;
                    });

                    if (suggestionsContainer.value) {
                        suggestionsContainer.value.addEventListener('scroll', updateScrollButtons);
                    }
                });

              
                    return {
    search,
    artists,
    artistSuggestions,
    artistImageMap,
    topArtist,
    isLoading,
    message,
    activeTab,
    showDetails,
    showFilters,
    albumSearch,
    selectedYears,
    showVinyl,
    showTopNav,
    artistImage,
    currentUser,
    currentTime,
    showPlaylist,
    selectedAlbum,
    totalReleases,
    availableYears,
    filteredReleases,
    formatTotalDuration,
    formatDuration,
    getTypeLabel,
    formatDate,
    fetchArtistData,
    fetchArtistSuggestions,
    selectArtist,
    handleMouseEnter,
    handleMouseLeave,
    handleAlbumClick,
    playTrack,
    suggestionsContainer,
    canScrollLeft,
    canScrollRight,
    scrollSuggestions,
    currentTrack, // Añadido
    isFullScreen, // Añadido
    exitFullScreen // Añadido
};

                
            }
        });

        app.use(vuetify);
        app.mount("#app");
    </script>
<script
              src="https://code.jquery.com/jquery-3.7.1.min.js"
              integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
              crossorigin="anonymous"></script>
             <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

              <script src="https://requirejs.org/docs/release/2.3.7/minified/require.js" crossorigin="anonymous"></script>
<script>function fullspectrum(){
 define("frequency-draw", ["require", "exports"], (function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e() {
                this.canvas = document.createElement("canvas"), this.canvas.width = 1024, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.backgroundColor = "#039"
            }
            return e.prototype.draw = function(e) {
                e.fftSize = 2048;
                var t = new Uint8Array(e.fftSize);
                e.getByteTimeDomainData(t);
                var i, n = this.ctx,
                    r = n.canvas,
                    a = t.length,
                    s = r.width / a,
                    u = 0;
                n.save(), n.fillStyle = this.backgroundColor, n.fillRect(0, 0, r.width, r.height), n.beginPath();
                for (var o = 0; o < a; o++) i = t[o] / 128 * r.height / 2, 0 === o ? n.moveTo(u, i) : n.lineTo(u, i), u += s;
                n.lineWidth = 2, n.strokeStyle = "#DBDBDB", n.stroke(), n.restore()
            }, e
        }();
        t.LineDraw = i;
        var n = function() {
            function e() {
                this.canvas = document.createElement("canvas"), this.canvas.width = 1280, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.backgroundColor = "black", this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height), this.gradient.addColorStop(0, "#ff4446"), this.gradient.addColorStop(1, "#4446ff")
            }
            return e.prototype.draw = function(e) {
                e.fftSize = 256;
                var t = new Uint8Array(e.frequencyBinCount);
                e.getByteFrequencyData(t);
                var i = this.ctx,
                    n = i.canvas,
                    r = t.length;
                i.save(), i.fillStyle = this.backgroundColor, i.fillRect(0, 0, n.width, n.height), i.transform(1, 0, 0, -1, 0, n.height), i.fillStyle = this.gradient;
                for (var a = n.width / r, s = 0, u = 0, o = 0; o < t.length; o++) u = t[o] / 255 * n.height, i.fillRect(s + 1, 0, a - 2, u), s += a;
                i.restore()
            }, e
        }();
        t.BarDraw = n
    })), define("equalizer", ["require", "exports"], (function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e) {
                this.frequencys = e, this.count = e.length, this.filters = new Array(this.count)
            }
            return e.prototype.init = function(e) {
                var t, i = 0;
                for (i = 0; i < this.count; i++)(
                    t = e.createBiquadFilter()).type = "peaking",
                 t.frequency.value = this.frequencys[i],
              //t.Q.value = 1000,
              //console.log('value='+t.Q.value ),
                  this.filters[i] = t,
                 this.filters[i - 1] && this.filters[i - 1].connect(this.filters[i])
            }, Object.defineProperty(e.prototype, "first", {
                get: function() {
                    return this.filters[0]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "last", {
                get: function() {
                    return this.filters[this.count - 1]
                },
                enumerable: !0,
                configurable: !0
            }), e
        }();
        t.EqualizerFilter = i;
        var n = function() {
            function e() {
                this.presets = {
                    Manual: {
                        name: "Manual",
                        values: [8, 5, 3, 3, 1, 3, 3, 3, 3, 3, 8, 8, 13]
                    },
                    Dance: {
                        name: "Dance",
                        values: [8, 5, 3, 3, 1, 3, 3, 3, 3, 3, 8, 8, 13]
                    },
                    Default: {
                        name: "Modulo Youp",
                        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                }, this.frequencys = [55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711], this.eqFilter = new i(this.frequencys)
            }
            return e.prototype.init = function(e) {
                this.eqFilter.init(e)
            }, e.prototype.use = function(e) {
                for (var t = this.presets[e] || this.presets[0], i = 0; i < this.eqFilter.filters.length; i++) this.eqFilter.filters[i].gain.value = t.values[i];
                    console.log('indiga');
            }, e.prototype.reset = function() {
                for (var e = 0; e < this.eqFilter.filters.length; e++) this.eqFilter.filters[e].gain.value = 0
            }, e.prototype.set = function(e, t) {
                this.eqFilter.filters[e].gain.value = t
            }, e.prototype.get = function(e) {
                return this.eqFilter.filters[e].gain.value
            }, e.prototype.connect = function(e, t) {
                this.eqFilter && (e.connect(this.eqFilter.first), this.eqFilter.last.connect(t))
            }, e.prototype.toString = function() {
                for (var e = [], t = 0; t < this.eqFilter.filters.length; t++) e[t] = this.eqFilter.filters[t].gain.value;
                return e.toString()
            }, e
        }();
        t.Equalizer = n
    })), define("equalizer-ui", ["require", "exports"], (function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            this.div = document.createElement("div"), this.freq = document.createElement("span"), this.input = document.createElement("input"), this.label = document.createElement("span"), this.div.className = "slide-wrapper", this.input.type = "range", this.input.min = "-13", this.input.max = "13", this.input.value = "0", this.input.className = "rechancices", this.freq.className = "scope", this.freq.textContent = "", this.label.className = "scope", this.label.textContent = this.input.value + " dB", this.div.appendChild(this.freq), this.div.appendChild(this.input), this.div.appendChild(this.label)
        };
        t.EqualizerUIItem = i;
        var n = function() {
            function e(e) {
                this.el = document.createElement("div"), this.el.className = "equalizer", this.comboxEqualizer = document.createElement("select"), this.items = [], this.updateItems(e)
            }
            return e.prototype.updateItems = function(e) {
                for (var t = 0; t < e; t++) {
                    var i = this.createItem(t);
                    this.el.appendChild(i.div), this.items[t] = i
                }
            }, e.prototype.createItem = function(e) {
                var t = this,
                    n = new i;
                return n.input.addEventListener("input", (function() {
                    t.update && t.update(n, e);
                    console.log('create itenb')
                }), !1), n
            }, e
        }();
        t.EqualizerUI = n
    })), define("audio-player", ["require", "exports", "equalizer", "equalizer-ui"], (function(e, t, i, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {
            function e() {
                this.eq = new i.Equalizer, this.ui = new n.EqualizerUI(this.eq.frequencys.length), this.audioCtx = new AudioContext, this.analyser = this.audioCtx.createAnalyser(), this.eq.init(this.audioCtx);
                for (var e = 0, t = void 0; e < this.ui.items.length; e++) t = this.ui.items[e], this.eq.frequencys[e] > 2e3 ? t.freq.textContent = Math.floor(this.eq.frequencys[e] / 1e3) + "K" : t.freq.textContent = this.eq.frequencys[e] + ""
            }
            return Object.defineProperty(e.prototype, "width", {
                get: function() {
                    return this.usedDraw ? this.usedDraw.canvas.width : 0
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "height", {
                get: function() {
                    return this.usedDraw ? this.usedDraw.canvas.height : 0
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.useDraw = function(e) {
                this.usedDraw = e
            }, e.prototype.connect = function(e) {
                this.mediaSource = this.audioCtx.createMediaElementSource(e), this.eq ? this.eq.connect(this.mediaSource, this.analyser) : this.mediaSource.connect(this.analyser), this.analyser.connect(this.audioCtx.destination)
            }, e.prototype.sync = function(e) {
                this.usedDraw && (e.canvas.width = this.width, e.canvas.height = this.height, e.drawImage(this.usedDraw.canvas, 0, 0, e.canvas.width, e.canvas.height))
            }, e.prototype.update = function() {
                this.usedDraw && this.usedDraw.draw(this.analyser)
            }, e
        }();
        t.AudioPlayer = r
    })), define("main", ["require", "exports", "frequency-draw", "audio-player"], (function(e, t, i, n) {
        "use strict";

        function r(e) {
            return document.getElementById(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), AudioContext ? function() {
            var e = r("play"),
                t = r("f"),
                a = r("fullscreen"),
                s = r("equalizer"),
                u = r("player"),
                o = r("cv").getContext("2d"),
                c = {
                    src: ""
                },
                l = r("combox-equalizer"),
                h = r("combox-draw"),
                d = new n.AudioPlayer,
                f = new i.LineDraw,
                p = new i.BarDraw,
                v = !1;

            function y() {
                v || (d.useDraw(p), d.eq && d.eq.reset(), q(), d.connect(u), v = !0)
            }

            function q() {
                for (var e = 0; e < 13; e++) {
                    var t = d.ui.items[e];
                    d.eq && (t.input.className = "ertert"+e, t.input.value = d.eq.get(e) + "", t.label.textContent = t.input.value + " dB");
                    console.log('flor'+d.eq.get(e))
                }
            }

            function m() {
                u.paused || (d.update(), d.sync(o)), requestAnimationFrame(m)
            }

            function g() {
                u.paused ? e.textContent = "Play" : e.textContent = "Pause"
            }
            d.ui.update = function(e, t) {
                var i = +e.input.value;
                condole.log('uji');
                d.eq && d.eq.set(t, i), q(), l.value = "Manual", e.label.textContent = i + " dB"
            }, s.appendChild(d.ui.el), u.volume = .3, u.addEventListener("play", (function() {
                "suspended" === d.audioCtx.state && d.audioCtx.resume(), y(), g()
                console.log("primordial");
                d.eq && d.eq.use('Dance'), q()
            }), !1), u.addEventListener("pause", (function() {
                g()
            }), !1), e.addEventListener("click", (function() {
                u.paused ? u.play() : u.pause()
            }), !1), t.addEventListener("input", (function(e) {
                var i = t.files && t.files[0];
                t.value = "", i && (c.src = URL.createObjectURL(i), u.src = c.src, g())
            }), !1), a.addEventListener("click", (function() {
                document.body.requestFullscreen()
            }), !1), l.addEventListener("change", (function() {
                var e = l.value;
                console.log('alla');
                d.eq && d.eq.use(e), q()
            }), !1), h.addEventListener("input", (function() {
                var e = h.value;
                "0" === e ? d.useDraw(f) : "1" === e && d.useDraw(p)
            }), !1), m()
        }() : alert("your browser not support AudioContext.")
    })), requirejs(["main"])
     document.getElementById("player").volume = .3;

      myAudio=document.getElementById('player');

}</script>
</body>

</html>
</html>