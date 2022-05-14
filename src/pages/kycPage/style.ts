import styled from 'styled-components';

export default styled.div`
  padding: 2% 5em;
  .kyc-page {
    &-title {
      font-size: 2rem;
      font-weight: bold;
      padding-bottom: 0.25rem;
    }
    &-content {
      &-description {
        background-color: var(--white);
        padding: 2% 3%;
        border-radius: 0.5rem;
        height: 100%;
        &__title {
          font-size: 1.5rem;
        }

        &__reason {
          &-title {
            font-size: 1.5rem;
            color: red;
          }

          &-suggestion {
            margin-top: 1rem;
            font-size: 1rem;
            color: rgb(112, 122, 138);
          }
        }
      }

      &-verification {
        background-color: rgb(234, 236, 239);
        padding: 2% 3%;
        border-radius: 5px;
        &__details {
          font-size: 1rem;
          svg {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
  .btn-verify {
    &--pending {
      background-color: var(--bs-warning) !important;
      color: #fff !important;
    }
    &--success {
      background-color: var(--bs-green);
      color: #fff !important;
    }
    &--error {
      background-color: #7cdfff !important;
      color: #fff !important;
    }
  }
`;
