import React from 'react';
import Style from './../style';

interface Introduction{
    title : string,
    size : number
}

 const setHeight = (height: number, rem: number)=>{     
    return height + rem*16;
 }
const IntroductionTitle = (toggle: Introduction) => {
    
    const renderNote = ()=>{
        switch(toggle.title){
            case 'title':
                return (
                    <div className='note_title'>
                       Create a title to help people understand the main content of the article.
                    </div>
                );
            case 'address':
                return (
                    <div className='note_address' >
                        Choose the location where you hold the charity event or the recipient's address.
                    </div>
                );
            case 'resident_address':
                return (
                    <div className='note_resident_address' >
                        Enter the specific address of the charity or the specific address of the beneficiary.
                    </div>
                );
            case 'content':
                return (
                    <div className='note_content'>
                       Share for everyone to understand the time and activities in your event. Or help people understand the beneficiary's situation.
                    </div>
                ); 
            case 'chat':
                return (
                    <div className='note_chat' style={{top: `${setHeight(toggle.size,23)}px` }}>
                        If you have an event-specific chat channel, enter it in the ''URL chat room'' for everyone to discuss.
                        Note that any non-standard links will not be accepted. If the link is in the correct format, the icon will turn green.
                    </div>
                );
            case 'photo':
                return (
                    <div className='note_photo'style={{top: `${setHeight(toggle.size,30)}px` }}>
                        Please share related photos for everyone (if any). You can only share up to 10 photos.
                        Please do not share photos that are not related to charity content.
                    </div>
                ); 
        }
    }
  return (
      <Style>
          <div className='note'>{renderNote()}</div>
      </Style>
  )
};
 export default React.memo(IntroductionTitle);