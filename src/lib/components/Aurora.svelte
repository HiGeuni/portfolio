<div class="aurora">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="blob blob-4"></div>
</div>

<style>
  .aurora {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
  }
  .blob-1 {
    left: -10%;
    top: -10%;
    width: 700px;
    height: 700px;
    background: #8FB8FF;
    filter: blur(140px);
    opacity: 0.06;
  }
  .blob-2 {
    right: -15%;
    top: 20%;
    width: 800px;
    height: 800px;
    background: #C09BFF;
    filter: blur(160px);
    opacity: 0.06;
  }
  .blob-3 {
    left: 10%;
    bottom: 10%;
    width: 600px;
    height: 600px;
    background: #7FE9E1;
    filter: blur(140px);
    opacity: 0.05;
  }
  .blob-4 {
    right: 5%;
    bottom: -10%;
    width: 700px;
    height: 700px;
    background: #8FB8FF;
    filter: blur(160px);
    opacity: 0.04;
  }
</style>
