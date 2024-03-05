import { HandPalm, Play } from "phosphor-react";
import { 
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton, 
} from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface NewCycleFormData {
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
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFineshed: () => void,
    setSecondsPassed: (seconds: number) => void,
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    // criando um estado para armazenar os segundos que passaram
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    // validando os inputs do formuláro utilizando o zod
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod
        .number()
        .min(1, 'o valor mínimo é 1')
        .max(60, 'o valor máximo é 60')
    })

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })
    
    const {watch, reset, handleSubmit} = newCycleForm
    const task = watch('task')
    const isSubmitDisabled = !task

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        reset()
    }

    function handleInterruptCycle() {
        setCycles(state => state.map(cycle => {
            if(cycle.id == activeCycleId) {
                return {...cycle, interruptDate: new Date()}
            }else {
                return cycle
            }
        }))

        setActiveCycleId(null)
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
    
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            <CyclesContext.Provider value={{
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFineshed,
                setSecondsPassed,
            }}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <CountDown />
            </CyclesContext.Provider>
                
                { activeCycle ? (
                    <StopCountDownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                ) }
            </form>
        </HomeContainer>
    )
}