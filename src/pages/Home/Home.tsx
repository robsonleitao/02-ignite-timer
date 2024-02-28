import { Play } from "phosphor-react";
import { 
    CountDownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountDownButton, 
    TaskInput 
} from "./styles";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from "react";

// validando os inputs do formuláro utilizando o zod
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'o valor mínimo é 5')
    .max(60, 'o valor máximo é 60')
})

interface NewCycleFormData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    // criando um estado para aramazenar os segundos que passaram
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const {register, handleSubmit, watch, reset} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const task = watch('task')
    const isSubmitDisabled = !task

    // convertendo minutos em segundos
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    // verificando quantos segundos já passaram
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    // convertendo os segundos restantes em minutos novamente
    const minutesAmount = Math.floor(currentSeconds / 60)

    // convertendo os minutos que não resultam valores inteiros para segundos novamente
    const secondsAmount = currentSeconds % 60

    // personalizando os minutos e segundos
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        reset()
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="projeto 222" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        step={5}
                        min={0}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}