<template>
    <Dialog v-model:visible="isDialogVisible" :modal="true" :closable="true" :closeOnEscape="true"
        :dismissableMask="true" @hide="closeDialog">
        <div class="dialogContent column">
            <p class="header">
                ¡Deja tus datos y nos pondremos en contacto!
            </p>
        </div>
    </Dialog>
</template>

<script>
export default {
    name: 'ContactDialog',

    data() {
        return {
            isDialogVisible: false
        }
    },

    methods: {
        openDialog() {
            this.isDialogVisible = true
        },

        closeDialog() {
            this.isDialogVisible = false
        }
    }
}
</script>

<style>
.p-dialog-mask {
    background: rgba(72, 3, 17, 0.3);
}

.p-dialog {
    width: 100%;
    max-width: 280px;
    background: var(--white-color);
    border-radius: 7px;
    padding: 1.25rem;
}

.p-dialog-header {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
}

.p-dialog .header {
    width: 90%;
    font-size: 1rem;
}
</style>