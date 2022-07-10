import styled from "styled-components";

export default styled.div`
  .form-input {
    margin-top: 1rem;
    label {
      margin-bottom: 0.2rem;
    }
  }

  .form-upload {
    &-header {
      &-note {
        font-size: 0.85rem;
        margin-bottom: 0.2rem;
      }
    }
  }

  .form-info {
    font-size: 1rem;
    &__key {
      color: var(--bs-blue);
    }
    img {
      border-radius: 5px;
    }
  }
`;
