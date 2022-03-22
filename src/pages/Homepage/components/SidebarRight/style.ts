import styled from "styled-components"
export default styled.div`
    .sidebar_top{
        display: flex ;
        justify-content: space-between ;
        font-size:1rem ;
    }
    .sidebar_group{
        display: flex;
        justify-content: space-between ;
        margin-top:2rem ;
        text-decoration: none ;
        color: var(--black) ;
        &_detail{
            display: flex ;
            margin-left:-1rem ;
            color: var(--black) ;
            text-decoration:none ;
            &_name{
                margin-left: 5px ;
                p{
                    margin: 0 ;
                }
            }
        }
        
        &_rate{
            display: flex ;
            flex-direction: column ;
            margin-right:-1.25rem ;
        }
    }
`