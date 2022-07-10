import styled from "styled-components";

export default styled.div`
  .header {
    padding: 1.25rem;
    font-size: 1rem;
    font-weight: bold;
    --distance: -2rem;
    .slide-right {
      width: 100%;
      overflow: hidden;
      /* margin-left: var(--distance); */
      animation: 2s slide-right 2s forwards;
      transform: translateX(-100%);
      font-size: 1.5rem;
    }

    @keyframes slide-right {
      to {
        transform: translateX(0);
      }
    }
  }

  .content {
    background-color: var(--white);
    min-height: 100vh;
    padding: 2% 3%;
    border-radius: 0.5rem;
    .form-input {
      position: relative;
      margin: 1em 0;

      label {
        margin: 0.25rem 0;
        font-size: 1rem;
      }

      .waring-error {
        margin-top: 0.25rem;
        color: red;
        display: block;
      }
    }
    .dropzone {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border-width: 2px;
      border-radius: 2px;
      border-color: #eeeeee;
      border-style: dashed;
      background-color: #fafafa;
      color: #bdbdbd;
      outline: none;
      transition: border 0.24s ease-in-out;
    }
    .dropzone:focus {
      border-color: #2196f3;
    }
    .thumb-file {
      display: flex;
    }

    .item-image {
      padding-bottom: 0 !important;
      padding-top: 0 !important;
      padding-left: 0;
    }
    /* .final-image {
      filter: blur(0.25px);
    } */
    .icon-safe {
      font-size: 1.25rem;
      position: absolute;
      right: 1rem;
      top: 25%;
    }
  }
  .introduction {
    padding: 0 2rem;
  }
`;
