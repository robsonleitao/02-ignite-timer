import { HandPalm, Play } from "phosphor-react";
import { 
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton, 
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

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

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    

    // verificando quantos segundos já passaram
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    // convertendo os segundos restantes em minutos novamente
    const minutesAmount = Math.floor(currentSeconds / 60)

    // convertendo os minutos que não resultam valores inteiros para segundos novamente
    const secondsAmount = currentSeconds % 60

    // personalizando os minutos e segundos
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    

    const task = watch('task')
    const isSubmitDisabled = !task

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

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
    console.log(cycles)
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm />
                <CountDown />
                
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