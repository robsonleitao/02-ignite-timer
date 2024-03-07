import { createContext, useState } from "react"

export interface NewCycleFormData {
    task: string
    minutesAmount: number
}

interface Cycle {
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
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFineshed() {
        setCycles(state => state.map(cycle => {
            if(cycle.id == activeCycleId) {
                return {...cycle, interruptDate: new Date()}
            }else {
                return cycle
            }
        }))
    }

    function createNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        // reset()
    }

    function interruptCurrentCycle() {
        setCycles(state => state.map(cycle => {
            if(cycle.id == activeCycleId) {
                return {...cycle, interruptDate: new Date()}
            }else {
                return cycle
            }
        }))

        setActiveCycleId(null)
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