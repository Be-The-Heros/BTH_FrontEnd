import styled from "styled-components";

export const InformContainer = styled.div`
  max-width: 40%;
  background-color: "#000";

  .review-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    margin: 2em 0 1em;
  }

  .organization-title {
    font-weight: 700;
    margin: 2em 0 1em;
  }
`;

export const PostsContainer = styled.div`
  max-width: 60%;
  background-color: "#000";

  .header {
    display: flex;
    justify-content: space-evenly;
    font-size: 1.5em;
    margin-bottom: 1.5em;
    background-color: var(--background-light);
  }
`;

//  Components
export const ReuseStyle = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const SocialDataContainer = styled(ReuseStyle)`
  padding: 1.3em 0em;
  padding-right: 3em;
`;

export const SocialDataItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em 10em 1em 1em;

  img {
    width: 25px;
    height: 25px;
    margin-right: 0.6em;
  }

  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px;
`;

export const ReviewsContainer = styled(ReuseStyle)`
  padding: 1em 1em;

  .review-container__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3em;

    &__reviews-number {
      font-style: normal;
      font-weight: 400px;
      line-height: 28px;
      letter-spacing: 0em;
    }

    &__review-link {
      font-family: Roboto;
      font-weight: 500px;
      line-height: 35px;
      letter-spacing: 0em;
      cursor: pointer;
    }
  }

  .review-container__review-list {
    max-height: 550px;
    overflow-y: auto;
  }
  .review-container__review-list::-webkit-scrollbar {
    width: 20px;
  }

  .review-container__review-list::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  .review-container__review-list::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 5px solid transparent;
    background-clip: content-box;
    background-color: #8070d4;
  }
`;

export const Review = styled.div`
  position: relative;
  border: 0.2px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 2em;
  margin-right: 1em;
  border-radius: 10px;
  background: #ffffff;

  .review__header__stars {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .review__comment {
    margin-left: 2em;
    font-weight: 400;
  }
`;

export const OrganizationsContainer = styled(ReuseStyle)`
  padding: 1em 1em;
  padding-bottom: 0.5em;

  .organization-container__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3em;

    &__organizations-number {
      font-style: normal;
      font-weight: 400px;
      line-height: 28px;
      letter-spacing: 0em;
    }

    &__organizations-link {
      font-weight: 500px;
      line-height: 35px;
      letter-spacing: 0em;
      cursor: pointer;
    }
  }
`;

export const Organization = styled.div`
  position: relative;
  border: 0.2px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 2em;
  border-radius: 10px;
  background: #ffffff;

  .organization__role {
    position: absolute;
    top: 1.5em;
    right: 1em;
    font-weight: 400;
    line-height: 28px;

    /* Dark 70 */
    color: rgba(0, 0, 0, 0.7);
  }

  .organization__location {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__icon {
      width: 15px;
      height: 15px;
      margin-right: 2px;
    }

    &__address {
      font-weight: 200;
      letter-spacing: 0em;
    }
  }
`;
