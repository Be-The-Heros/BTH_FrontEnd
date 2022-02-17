import PopupLogin from 'components/PopupSuggestLogin';
import React from 'react';
import { LayoutApp } from 'templates/LayoutApp';

const CreatePostPage = () => {
  const [isOpenPopup, setIsOpenPopup] = React.useState(true);
  return (
    <LayoutApp>
      <PopupLogin isOpen={isOpenPopup} onClose={() => setIsOpenPopup(false)} />
      <h1>Create Post Page</h1>
    </LayoutApp>
  );
};

export default CreatePostPage;
