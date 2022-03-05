import styled from "styled-components";

export default styled.div`
  .form-sign-up {
    box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.08);
    border-radius: 2em;
    background-color: #ffff;
    min-height: 500px;
    width: 450px;
    padding: 2.5em 1em;
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
      &--sign-up-link {
        cursor: pointer;
        color: var(--primary-light);
        &:hover {
          color: var(--dark);
          text-decoration: underline;
        }
      }
    }

    &__content {
      &--form-input {
        position: relative;
        margin: 1em 0;
        label {
          margin: 0.5em 0;
        }
        input {
          border-radius: 0.5em;
          outline: none;
          border: 1px solid var(--border);
          width: 100%;
          padding: 0.5em 1em;
          box-sizing: border-box;
          &:focus {
            border-color: var(--primary);
          }
        }
        svg {
          position: absolute;
          right: 1em;
          bottom: 0.6em;
          font-size: 1.25em;
          cursor: pointer;
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
      .btn--sign-up {
        background-color: var(--primary-light) !important;
        color: #ffff !important;
        border-radius: 0.75em;
        padding: 0.5em;
        margin: 1.5em 0;
        box-shadow: 0px 4px 19px rgba(119, 147, 65, 0.3);

        &:disabled {
          background-color: var(--primary-light) !important;
          opacity: 0.3;
          cursor: disabled;
        }
      }
    }
  }
`;
