import { createContext, useState, useReducer, ReactNode, useEffect } from "react"
import { cyclesReducer } from "../reducers/cycles/reducer"
import { 
    addNewCycleAction, 
    interruptCurrentCycleAction, 
    markCurrentCycleAsFineshedAction 
} from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns"

export interface NewCycleFormData {
    task: string
    minutesAmount: number
}

export interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date,
    fineshedDate?: Date
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFineshed: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: NewCycleFormData) => void,
    interruptCurrentCycle: () => void,
}

interface CyclesContextProviderProps {
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children}: CyclesContextProviderProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        activeCycleId: null,
        cycles: [],
    }, (stateInicial) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state')

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return stateInicial
    })

    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        } 

        return 0
    })

    useEffect(() => {
        const stateJSON =  JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer:cycles-state', stateJSON)

    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFineshed() {
        dispatch(markCurrentCycleAsFineshedAction())
    }

    function createNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFineshed,
            setSecondsPassed,
            interruptCurrentCycle,
            createNewCycle
        }}>
            {children}
        </CyclesContext.Provider>
    )
}