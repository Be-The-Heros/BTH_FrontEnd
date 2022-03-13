
import styled from 'styled-components';

export default styled.div`
    .Newfeed_head{
        display: flex;
        justify-content: space-between;
        margin: 20px;
        
        &_info{
            display: flex;
           
            img {
                align-content: center;
                width: 4.75em;
                height: 4.75em;
                border-radius: 50%;
                border: 1px solid #ffff;
            }
            &_detail{
               margin-left: 1rem;
               p{
                   margin: 0;
               }
               &_locate{
                   display: flex;
                   margin-top: 5px;
                   
                   div{
                       
                       margin-left: 6px;
                   }
               }
            }
        }
        
        &_join{
            Button{
                background-color: var(--primary);
                color: #ffff;
            }
        }

    }
    .Newfeed_body{
        a{
            text-decoration: none;
        }
        margin-bottom: 3rem;
        h3{
            text-align: center;
        }
        &_title{
            display: flex;
            margin-bottom: 1em;
            .name{
                margin-top: 5px;
            }
            p{
                text-align: center;
                margin-left: 15px;
                color: var(--dark);
                
            }
        }
    }
    .Newfeed_footer{
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-around;
    }
    
`