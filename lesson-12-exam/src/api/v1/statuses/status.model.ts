export interface StatusEntity extends CreateStatus {
    id: number
    is_completed: boolean
}

export interface CreateStatus {
    contract: number
}

export interface UpdateStatus extends Partial<CreateStatus> {
    is_completed?: boolean
}