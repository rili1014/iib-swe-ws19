import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
import React from 'react'

interface Props {
    open: boolean
    onDeleteConfirme: () => void
    onDeleteAbort: () => void
}

/*
 * Stateless component, die einzig und allein über Props kommuniziert
 */
export const RecipeDeleteDialog = ({ open, onDeleteConfirme, onDeleteAbort }: Props) => (
    <Dialog open={open} onClose={onDeleteAbort}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                this operation cannot be undone. The Recipe will be lost
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={onDeleteConfirme}>
                yes
            </Button>
            <Button onClick={onDeleteAbort}>No</Button>
        </DialogActions>
    </Dialog>
)
