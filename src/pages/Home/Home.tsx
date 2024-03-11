import { HandPalm, Play } from "phosphor-react";
import { 
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton, 
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from "react";
import { CyclesContext, NewCycleFormData } from "../../contexts/CyclesContext";

export function Home() {
    const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)

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

    const {watch, handleSubmit, reset} = newCycleForm
    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }
    
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <CountDown />
                
                { activeCycle ? (
                    <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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