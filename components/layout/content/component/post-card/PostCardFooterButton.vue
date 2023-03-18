<template>
  <div class="footer-button-group">
    <div class="footer-button button-recommend">
            <font-awesome-icon icon="heart" />
      <span>추천</span>
      <div class="tooltip-bubble">
        <div class="tooltip-content"><span>준비중 입니다.</span></div>
        <div class="arrow"></div>
      </div>
    </div>
    <div class="footer-button button-comment">
            <font-awesome-icon icon="message" />
      <span>댓글</span>
    </div>
  </div>
</template>

<style lang="scss">
.footer-button-group {
  display: flex;
  flex-direction: row;

  .footer-button {
    display: inline-block;
    padding: 20px 7.2px;
    width: 100%;
    color: #b2adad;
    transition: none;
    cursor: pointer;


    //== 둘다 해줘야 transition 적용 ==//
    & svg {
      transition: none;

      & path {
        transition: none;
      }
    }

    & span {
      margin: 0px 7px;
      transition: none;
    }

    &:hover,:active {
      color: #6b6b6b;
    }

    &.button-recommend {

      & .tooltip-bubble {
        opacity: 0;
        transition: .0s;
        position: relative;
        height: 0px;
        margin: 0 auto;
        font-size: .82rem;
        width: 150px;

        & .tooltip-content {
          width: 60%;
          margin: 0 auto;
          background-color: black;
          color: white;
          padding: 4px 3px;
          border-radius: 15px;

        }

        & .arrow {
          height: 0px;

          &:before {
            content: "";
            border-style: solid;
            border-color: transparent;
            position: relative;
            top: 5px;
            border-width: 0.4rem 0.4rem 0;
            border-top-color:black;
          }
        }
      }

      &:active, &:hover {

        & path {
          color: #f85f5b;
        }

        & .tooltip-bubble {
          opacity: 1;
          top: -55px;
        }
      }
    }
  }
}
</style>
