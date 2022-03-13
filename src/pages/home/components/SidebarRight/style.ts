import styled from "styled-components"
export default styled.div`
    .sidebar_top{
        display: flex ;
        justify-content: space-between ;
    }
    .sidebar_group{
        position: relative;
        margin-top:1rem ;
        &_icon{
            position: absolute;
            z-index:2 ;
            margin-left: 10px ;
        }
        &_bg{
             position: absolute ;
             top: -12px;
             z-index: 1 ;
         }
    }
`