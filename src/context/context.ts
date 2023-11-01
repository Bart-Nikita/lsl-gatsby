import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from "react";
import TrainingsModal from "../components/pages/TrainingsPage/TrainingsModal/TrainingsModal";
import { BlogPostProps } from "../templates/blogPost";

const isBrowser = typeof window !== "undefined"

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
    historyPage: Queries.HistoryPageQuery | undefined,
    contactPage: Queries.ContactsPageQuery | undefined,
    blogPage: Queries.BlogPageQuery | undefined,
    trainingsPage: Queries.TrainingsPageQuery | undefined,
    blogPostPage: Queries.WpBlog | undefined,
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
    posts: Queries.WpBlog[] | undefined | null,
    publications: Queries.WpPublication[] | undefined | null,
    files: Queries.File[] | undefined | null,
    menuItems: Queries.WpMenuItem[] | undefined | null,
    trainings: Queries.WpTraining[] | undefined | null,
    feedbacksPage: Queries.FeedbacksPageQuery | undefined | null,
    emails: Queries.WpMenu_Formmails_formsMails[]
}

const doc = typeof window === 'undefined' ? null : window.document

type PageData = Queries.IndexPageQuery & Queries.HistoryPageQuery & Queries.ContactsPageQuery & Queries.BlogPageQuery & Queries.TrainingsPageQuery & BlogPostProps

export const globalState = (data: PageData): GlobalContextType => {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isNavModalOpen, setIsNavModalOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [historyLength, setHistoryLength] = useState<number>(0)
    const [isNewContainer, setIsNewContainer] = useState<boolean>(false)
    const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false)
    const [isTrainingFormModalOpen, setIsTrainingFormModalOpen] = useState(false)
    const [trainingModalData, setTrainingModalData] = useState<Queries.WpTraining | null>(null)
    const [instructionBooksPage, setInstructionBooksPage] = useState<Queries.InstructionsPageQuery>()
    const [feedbacksPage, setFeedbacksPage] = useState<Queries.FeedbacksPageQuery | null>()

    const [isInstructionBooksModalOpen, setIsInstructionBooksModalOpen] = useState(false)
    const [isInstructionBooksFormModalOpen, setIsInstructionBooksFormModalOpen] = useState(false)
    const [isInstructionBooksHeroFormModalOpen, setIsInstructionBooksHeroFormModalOpen] = useState(false)

    const [instructionBooksModalData, setInstructionBooksModalData] = useState<Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok | null>(null)



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
        if (isBrowser) {
            window.document?.body?.clientWidth && setIsMobile(window.document?.body?.clientWidth < 1024)

        }

    }, [isBrowser])


    useEffect(() => {
        if ((isTrainingFormModalOpen || isNavModalOpen || isTrainingModalOpen || isInstructionBooksFormModalOpen || isInstructionBooksHeroFormModalOpen || isInstructionBooksModalOpen) && isBrowser) {
            document.documentElement.style.overflow = 'hidden';
            return () => {
                document.documentElement.style.overflow = 'auto'

            }
        }
    }, [isTrainingFormModalOpen, isNavModalOpen, isTrainingModalOpen, isInstructionBooksFormModalOpen, isInstructionBooksHeroFormModalOpen, isInstructionBooksModalOpen, isBrowser]);


    return {
        emails:data?.pageContext?.emails || data?.wpMenu?.formMails?.formsMails,
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
        mainPage: data,
        contactPage: data,
        blogPage: data,
        historyPage: data,
        trainingsPage: data,
        blogPostPage: data?.pageContext?.post,
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
        setIsInstructionBooksModalOpen,
        isInstructionBooksHeroFormModalOpen,
        setIsInstructionBooksHeroFormModalOpen,
        commonSections: data?.pageContext?.commonSections || data?.allWpCommonSection?.nodes,
        posts: data?.pageContext?.allPosts || data?.allWpBlog?.nodes,
        publications: data?.allWpPublication?.nodes,
        files:data?.pageContext?.allFiles || data?.allFile?.nodes,
        menuItems:data?.pageContext?.menuItems || data?.allWpMenuItem?.nodes,
        trainings: data?.allWpTraining?.nodes,
        feedbacksPage,
        setFeedbacksPage
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
