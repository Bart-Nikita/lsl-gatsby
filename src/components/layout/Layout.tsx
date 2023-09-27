import React, { memo, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Header, { Navigation } from "./Header/Header";
import Cookies from "./Cookies/Cookies";
import Footer from "./Footer/Footer";
import { useGlobalContext } from "../../context/context";
import { useQuery } from "@apollo/client";
import Loading from "../loading/Loading";
import FixedLayer from "./FixedLayer/FixedLayer";
import Modal from "./Modal/Modal";
import NavModal from "./Header/Navigatioin/NavModal/NavModal";
import TrainingsFormModal from "../pages/TrainingsPage/TrainingsFormModal/TrainingsFormModal";
import TrainingsModal from "../pages/TrainingsPage/TrainingsModal/TrainingsModal";
import InstructionsBooksFormModal from '../pages/InstructionBooksPage/InstructionsBooksFormModal/InstructionsBooksFormModal';
import InstructionsBooksModal from '../pages/InstructionBooksPage/InstructionsBooksModal/InstructionsBooksModal';

type LayoutProps = {
    children: ReactElement | ReactNode
}

// const ModalLayer = () => {


//     const {
//         setIsTrainingModalOpen,
//         setIsTrainingFormModalOpen,
//         setIsNavModalOpen,
//         isTrainingModalOpen,
//         isTrainingFormModalOpen,
//         isNavModalOpen,
//         isInstructionBooksFormModalOpen,
//         isInstructionBooksHeroFormModalOpen,
//         isInstructionBooksModalOpen,
//         setIsInstructionBooksHeroFormModalOpen,
//         setIsInstructionBooksModalOpen,
//         setIsInstructionBooksFormModalOpen
//     } = useGlobalContext()
//     const onNavModalClose = (value: boolean) => {
//         setIsNavModalOpen(false)
//     }

//     const onTrainingModalClose = (value: boolean) => {
//         setIsTrainingModalOpen(false)
//     }

//     const onTrainingFormModalClose = (value: boolean) => {
//         setIsTrainingFormModalOpen(false)
//     }

//     const onInstructionsFormModalClose = (value: boolean) => {
//         if (isInstructionBooksFormModalOpen) {
//             setIsInstructionBooksFormModalOpen(false)
//         } 

//         if (isInstructionBooksHeroFormModalOpen) {
//             setIsInstructionBooksHeroFormModalOpen(false)
//         }  
//       }

//     const onInstructionsModalClose = (value: boolean) => {
//         setIsInstructionBooksModalOpen(false)
//     }

//     const onInstructionsHeroFormModalClose = (value: boolean) => {
//         setIsInstructionBooksHeroFormModalOpen(false)
//     }
//     return <FixedLayer>
//         <Cookies></Cookies>
//         <Modal open={isNavModalOpen} setOpen={onNavModalClose}>
//             {isNavModalOpen && <Navigation></Navigation>}
//         </Modal>
//         <Modal open={isTrainingModalOpen} setOpen={onTrainingModalClose}>
//             {isTrainingModalOpen && <TrainingsModal></TrainingsModal>}
//         </Modal>
//         <Modal open={isTrainingFormModalOpen} setOpen={onTrainingFormModalClose}>
//             {isTrainingFormModalOpen && <TrainingsFormModal></TrainingsFormModal>}
//         </Modal>
//         <Modal open={isInstructionBooksFormModalOpen || isInstructionBooksHeroFormModalOpen} setOpen={onInstructionsFormModalClose}>
//             {(isInstructionBooksFormModalOpen || isInstructionBooksHeroFormModalOpen) && <InstructionsBooksFormModal></InstructionsBooksFormModal>}
//         </Modal>
//         <Modal open={isInstructionBooksModalOpen} setOpen={onInstructionsModalClose}>
//             {isInstructionBooksModalOpen && <InstructionsBooksModal></InstructionsBooksModal>}
//         </Modal>

//     </FixedLayer>
// }

const Layout = memo(({ children }: LayoutProps) => {
    const {
        title,
        description,
        isLoading,
        isNavModalOpen,
        historyLength,
        isTrainingFormModalOpen,
        isTrainingModalOpen,
        mainPage,
        setMainPage
    } = useGlobalContext()

   
    useEffect(() => {
        document.body.addEventListener('focusin', (e) => {
            // console.log(e.target)
        })
    }, []);
    console.log('layout')

    return (
        <div>
            {children}
        </div>
    )

    // return (
    //     <>
    //         <Helmet>
    //             {title && <title>{title}</title>}
    //         </Helmet>

    //         {historyLength < 2 ?
    //             <>
    //                 <Loading></Loading>
    //                 <div style={{ display: isLoading ? 'none' : 'block' }} className={!isLoading ? 'animate-appear' : ''}>
    //                     <Header></Header>
    //                     <ModalLayer></ModalLayer>
    //                     <main id={'main'}>
    //                         {children}
    //                     </main>
    //                     <Footer></Footer>
    //                 </div>
    //             </>
    //             : <>
    //                 <Header></Header>
    //                 <ModalLayer></ModalLayer>
    //                 {children}
    //                 <Footer></Footer>
    //             </>}

    //     </>
    // );
});

export default Layout;
