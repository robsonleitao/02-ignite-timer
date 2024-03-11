import { createContext, useState, useReducer, ReactNode } from "react"
import { cyclesReducer } from "../reducers/cycles/reducer"
import { 
    addNewCycleAction, 
    interruptCurrentCycleAction, 
    markCurrentCycleAsFineshedAction 
} from "../reducers/cycles/actions"

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
    })

    const {cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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