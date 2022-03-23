import styled from "styled-components"
export default styled.div`
    .user{
        &_info{
            display: flex;
            text-decoration: none ;
            color: var(--black);
            img {
                align-content: center;
                width: 4.75em;
                height: 4.75em;
                border-radius: 50%;
                border: 1px solid #ffff;
            }
            &_name{
                margin: auto 0.5rem ;
                font-weight:bold ;
            }
        }
        &_detail{
            margin: 1rem 0 ;
        }
        &_label{
            font-weight: bold ;
            margin-top:1rem ;
        }
    }
    
    
`