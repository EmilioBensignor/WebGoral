<template>
    <section>
        <div class="columnAlignCenter">
            <h2 class="text-primary">Impulsá tu negocio con productos de calidad</h2>
            <Accordion value="0">
                <AccordionPanel v-for="(service, index) in services" :key="index">
                    <AccordionHeader>
                        <h3>{{ service.title }}</h3>
                    </AccordionHeader>
                    <AccordionContent>
                        <p v-html="service.text"></p>
                        <img :src="`/images/home/${service.video}`" alt="">
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <NuxtLink to="#" class="primaryButton">Hacé tu pedido ahora</NuxtLink>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            services: [
                {
                    title: "Certificados por Global GAP",
                    text: "<span>Cumplimos con los más altos estándares.</span> Nuestras prácticas agrícolas están certificadas por Global GAP, garantizando productos seguros y responsables.",
                    video: "Video-Service.png",
                },
                {
                    title: "Consistencia en tus pedidos",
                    text: "Granadas con el mismo estándar, siempre. Garantizamos que cada lote tenga la <span>misma calidad y tamaño</span> siempre recibas el producto que esperas.",
                    video: "Video-Service.png",
                },
                {
                    title: "Importa granadas a tu país",
                    text: "<span>Desde San Juan al mundo.</span> Proveemos un servicio de exportación confiable para que puedas importar el mejor producto a tu mercado.",
                    video: "Video-Service.png",
                },
                {
                    title: "Asistencia personalizada",
                    text: "Nuestro equipo te acompaña en cada etapa con <span>atención personalizada</span>, para que nunca estés solo en el proceso.",
                    video: "Video-Service.png",
                },
            ],
        }
    }
}
</script>