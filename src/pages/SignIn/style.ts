import styled from 'styled-components';

export default styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to left, #ffff 50%, var(--primary) 50%);
  .form-sign-in {
    box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.08);
    border-radius: 2em;
    background-color: #ffff;
    min-height: 500px;
    padding: 3em 1em;
    &__header {
      &--welcome {
        font-size: 0.95em;
        font-weight: 500;
        span {
          color: var(--primary-light);
        }
      }
      &--type {
        font-size: 2.5em;
        font-weight: bold;
        line-height: 82px;
      }

      &--sign-up {
        color: var(--label);
        &:hover {
          color: var(--dark);
        }
        a {
          color: var(--primary-light);
        }
      }
    }

    &__content {
      &--form-input {
        label {
          margin: 1em 0;
        }
        input {
          border-radius: 0.5em;
          outline: none;
          border: 1px solid #adadad;
          width: 100%;
          padding: 0.5em 1em;
          box-sizing: border-box;
          &:focus {
            border-color: var(--primary);
          }
        }
      }
    }
    &__footer {
      &-fg {
        font-size: 0.95em;
        padding: 1em 0;
        cursor: pointer;
        &:hover {
          color: var(--primary);
        }
      }
      .btn--sign-in {
        background-color: var(--primary-light) !important;
        color: #ffff !important;
        border-radius: 0.75em;
        padding: 0.5em;
      }
    }
  }
`;
