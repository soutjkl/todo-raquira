import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import styled from 'styled-components'

export default function ModalWindow({ children, state, setState }) {
    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                        {/* <ProductInformationComponent/> */}
                        {children}
                        <CloseButton onClick={()=>setState(false)}><FontAwesomeIcon icon={faX} /></CloseButton>
                    </ModalContainer>
                </Overlay>
            }
        </>
    )
}

const CloseButton = styled.button`
    position: absolute;
    top:20px;
    right:20px;
    background: rgba(210, 105, 30, 1);
    border:none;
    cursor: pointer;
    transition: .2s ease all;
    color:white;
    padding:8px;
    width: 40px;
    height: 40px;
    &:hover{
        background: rgba(76, 70, 61, 1);
    }
`;

const Overlay = styled.div` 
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left:0;
    background: rgba(76, 70, 61, 0.698);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
`;

const ModalContainer = styled.div`
    max-width:950px;
    min-height:200px;
    background: #FFFFF3;
    position: relative;
    box-shadow: 4.68611px 4.68611px 6.69444px rgba(0, 0, 0, 0.25);
    padding:20px;
    `;
