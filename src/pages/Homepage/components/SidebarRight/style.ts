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
        
        &_detail{
            display: flex ;
            margin-left:-8px ;
            &_name{
                margin-left: 5px ;
            }
        }
        
        &_rate{
            display: flex ;
            flex-direction: column ;
            margin-right:-10px ;
        }
    }
`