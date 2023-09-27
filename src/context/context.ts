import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";


export type GlobalContextType = {

    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    title: string | undefined
    setTitle: Dispatch<SetStateAction<string | undefined>>
    description: string | undefined
    setDescription: Dispatch<SetStateAction<string | undefined>>
    isNavModalOpen: boolean
    setIsNavModalOpen: Dispatch<SetStateAction<boolean>>
    isMobile: boolean,
    historyLength: number,
    setHistoryLength: Dispatch<SetStateAction<number>>,
    mainPage: Queries.IndexPageQuery | undefined,
    setMainPage: Dispatch<SetStateAction<Queries.IndexPageQuery | undefined>>,
    historyPage: Queries.HistoryPageQuery | undefined,
    setHistoryPage: Dispatch<SetStateAction<Queries.HistoryPageQuery | undefined>>,
    contactPage: Queries.ContactsPageQuery | undefined,
    setContactPage: Dispatch<SetStateAction<Queries.ContactsPageQuery | undefined>>,
    blogPage: Queries.BlogPageQuery | undefined,
    setBlogPage: Dispatch<SetStateAction<Queries.BlogPageQuery | undefined>>,
    trainingsPage: Queries.TrainingsPageQuery | undefined,
    setTrainingsPage: Dispatch<SetStateAction<Queries.TrainingsPageQuery | undefined>>,
    blogPostPage: Queries.WpBlog | undefined,
    setBlogPostPage: Dispatch<SetStateAction<Queries.WpBlog | undefined>>,
    isNewContainer: boolean,
    setIsNewContainer: Dispatch<SetStateAction<boolean>>,
    isTrainingModalOpen: boolean,
    setIsTrainingModalOpen: Dispatch<SetStateAction<boolean>>,
    isTrainingFormModalOpen: boolean,
    setIsTrainingFormModalOpen: Dispatch<SetStateAction<boolean>>,
    trainingModalData: Queries.WpTraining | null,
    setTrainingModalData: Dispatch<SetStateAction<Queries.WpTraining | null>>,
    instructionBooksPage: Queries.InstructionsPageQuery | undefined,
    setInstructionBooksPage: Dispatch<SetStateAction<Queries.InstructionsPageQuery | undefined>>,
    isInstructionBooksModalOpen: boolean,
    setIsInstructionBooksModalOpen: Dispatch<SetStateAction<boolean>>,
    isInstructionBooksFormModalOpen: boolean,
    setIsInstructionBooksFormModalOpen: Dispatch<SetStateAction<boolean>>,
    isInstructionBooksHeroFormModalOpen: boolean,
    setIsInstructionBooksHeroFormModalOpen: Dispatch<SetStateAction<boolean>>,
    instructionBooksModalData: Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok | null,
    setInstructionBooksModalData: Dispatch<SetStateAction<Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok | null>>
    commonSections: Queries.WpCommonSection[] | undefined | null,
    setCommonSections: Dispatch<SetStateAction<Queries.WpCommonSection[] | undefined | null>>,
    posts: Queries.WpBlog[] | undefined | null,
    setPosts: Dispatch<SetStateAction<Queries.WpBlog[] | undefined | null>>,
    publications: Queries.WpPublication[] | undefined | null,
    setPublications: Dispatch<SetStateAction<Queries.WpPublication[] | undefined | null>>,
    files: Queries.File[] | undefined | null,
    setFiles: Dispatch<SetStateAction<Queries.File[] | undefined | null>>,
    menuItems: Queries.WpMenuItem[] | undefined | null,
    setMenuItems: Dispatch<SetStateAction<Queries.WpMenuItem[] | undefined | null>>,
    trainings: Queries.WpTraining[] | undefined | null,
    setTrainings: Dispatch<SetStateAction<Queries.WpTraining[] | undefined | null>>,
}


type PageData = Queries.IndexPageQuery & Queries.HistoryPageQuery & Queries.ContactsPageQuery & Queries.BlogPageQuery & Queries.TrainingsPageQuery & Queries.WpBlog

export const globalState = (data: PageData): GlobalContextType => {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isNavModalOpen, setIsNavModalOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [historyLength, setHistoryLength] = useState<number>(0)
    const [mainPage, setMainPage] = useState<Queries.IndexPageQuery>()
    const [contactPage, setContactPage] = useState<Queries.ContactsPageQuery>()
    const [historyPage, setHistoryPage] = useState<Queries.HistoryPageQuery>()
    const [blogPage, setBlogPage] = useState<Queries.BlogPageQuery>()
    const [blogPostPage, setBlogPostPage] = useState<Queries.WpBlog>()
    const [trainingsPage, setTrainingsPage] = useState<Queries.TrainingsPageQuery>()
    const [isNewContainer, setIsNewContainer] = useState<boolean>(false)
    const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false)
    const [isTrainingFormModalOpen, setIsTrainingFormModalOpen] = useState(false)
    const [trainingModalData, setTrainingModalData] = useState<Queries.WpTraining | null>(null)
    const [instructionBooksPage, setInstructionBooksPage] = useState<Queries.InstructionsPageQuery>()

    const [isInstructionBooksModalOpen, setIsInstructionBooksModalOpen] = useState(false)
    const [isInstructionBooksFormModalOpen, setIsInstructionBooksFormModalOpen] = useState(false)
    const [isInstructionBooksHeroFormModalOpen, setIsInstructionBooksHeroFormModalOpen] = useState(false)

    const [instructionBooksModalData, setInstructionBooksModalData] = useState<Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok | null>(null)
    const [commonSections, setCommonSections] = useState<Queries.WpCommonSection[] | null>()
    const [posts, setPosts] = useState<Queries.WpBlog[] | null>()
    const [publications, setPublications] = useState<Queries.WpPublication[] | null>()
    const [files, setFiles] = useState<Queries.File[] | null>()
    const [menuItems, setMenuItems] = useState<Queries.WpMenuItem[] | null>()
    const [trainings, setTrainings] = useState<Queries.WpTraining[] | null>()


    useEffect(() => {

        if (isInstructionBooksFormModalOpen) {
            setIsInstructionBooksModalOpen(false)
            return () => {
                setIsInstructionBooksModalOpen(true)
            }
        }
    }, [isInstructionBooksFormModalOpen]);

    useEffect(() => {
        if (isTrainingFormModalOpen) {
            setIsTrainingModalOpen(false)
            return () => {
                setIsTrainingModalOpen(true)
            }
        }
    }, [isTrainingFormModalOpen]);


    useEffect(() => {
        // setIsMobile(document.body.clientWidth < 1024)

    }, [])

    // useEffect(() => {
    //     setHistoryLength(prev => prev + 1)
    //     scrollTo(0, 0)

    // }, [location.href])

    useEffect(() => {
        // if (isTrainingFormModalOpen || isNavModalOpen || isTrainingModalOpen || isInstructionBooksFormModalOpen || isInstructionBooksHeroFormModalOpen || isInstructionBooksModalOpen) {
        //     document.body.style.overflowY = 'hidden'
        //     return () => {
        //         document.body.style.overflowY = 'auto'
        //     }
        // }
    }, [isTrainingFormModalOpen, isNavModalOpen, isTrainingModalOpen, isInstructionBooksFormModalOpen, isInstructionBooksHeroFormModalOpen, isInstructionBooksModalOpen]);


    useEffect(() => {
        if (data) {
            if (data?.wpPage) {
                //@ts-ignore
                data?.wpPage.slug === 'glavnaya' && setMainPage(data)
            }
            //@ts-ignore
            setCommonSections(data?.allWpCommonSection?.nodes)
            //@ts-ignore
            setPosts(data?.allWpBlog?.nodes)
            //@ts-ignore
            setPublications(data?.allWpPublication?.nodes)
            //@ts-ignore
            setFiles(data?.allFile?.nodes)
            //@ts-ignore
            setMenuItems(data?.allWpMenuItem?.nodes)
            //@ts-ignore
            setTrainings(data?.allWpTraining?.nodes)
        }

    }, [data])

    return {
        title,
        setTitle,
        description,
        setDescription,
        isLoading,
        setIsLoading,
        isNavModalOpen,
        setIsNavModalOpen,
        isMobile,
        historyLength,
        setHistoryLength,
        setMainPage,
        mainPage,
        setContactPage,
        contactPage,
        blogPage,
        setBlogPage,
        historyPage,
        setHistoryPage,
        setTrainingsPage,
        trainingsPage,
        blogPostPage,
        setBlogPostPage,
        isNewContainer,
        setIsNewContainer,
        isTrainingModalOpen,
        setIsTrainingFormModalOpen,
        setIsTrainingModalOpen,
        isTrainingFormModalOpen,
        setTrainingModalData,
        trainingModalData,
        instructionBooksModalData,
        instructionBooksPage,
        isInstructionBooksFormModalOpen,
        setInstructionBooksModalData,
        setInstructionBooksPage,
        setIsInstructionBooksFormModalOpen,
        isInstructionBooksModalOpen,
        setIsInstructionBooksModalOpen, isInstructionBooksHeroFormModalOpen, setIsInstructionBooksHeroFormModalOpen, commonSections, setCommonSections, posts, setPosts, publications, setPublications, files, setFiles, menuItems, setMenuItems, trainings, setTrainings
    }
}


export const GlobalContext = createContext<GlobalContextType | null>(null)

export const useGlobalContext = () => {
    const currentContext = useContext(GlobalContext);

    if (!currentContext) {
        throw new Error(
            "GlobalContext has to be used within <GlobalContext.Provider>"
        );
    }

    return currentContext;
};
