<template>
  <div class="loader-skeleton">
    <svg viewBox="0 0 400 440" class="bg-gray-100 dark:bg-gray-800 rounded-2xl" >
      <rect clip-path="url(#content-loader-clip)" x="0" y="0" width="100%" height="100%" style="fill: url('#content-loader-gradient');"></rect>
      <defs>
        <clipPath id="content-loader-clip" >
          <circle cx="40" cy="40" r="25"></circle>
          <rect x="75" y="25" rx="4" ry="4" width="200" height="13"></rect>
          <rect x="75" y="45" rx="4" ry="4" width="145" height="8"></rect>
          <rect x="20" y="100" rx="4" ry="4" width="360" height="13"></rect>
          <rect x="20" y="120" rx="4" ry="4" width="360" height="13"></rect>
          <rect x="20" y="140" rx="4" ry="4" width="300" height="13"></rect>
          <rect x="20" y="180" rx="5" ry="5" width="360" height="200"></rect>
          <rect x="20" y="400" rx="5" ry="5" width="40" height="20"></rect>
          <rect x="70" y="400" rx="5" ry="5" width="90" height="20"></rect>
          <rect x="170" y="400" rx="5" ry="5" width="60" height="20"></rect>
        </clipPath>
        <linearGradient id="content-loader-gradient">
          <stop offset="0%" :stop-color="$colorMode.value === 'dark' ? '#31344b' : '#eaeaea'" stop-opacity="1">
            <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite"></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
@keyframes skeleton-animation {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

.loader-skeleton {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    animation: skeleton-animation 1.5s infinite ease-in-out;
  }
}
</style>