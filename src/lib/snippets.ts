/**
 * Chart code snippets for all chart types
 * Centralized source of truth for example code
 */

import type { ChartId } from "./constants";

export const CHART_SNIPPETS: Record<ChartId, Record<string, string>> = {
  "get-started": {},

  bar: {
    React: `// React example (functional component)
import { useEffect, useRef } from 'react';
import { ChartoonBarChart } from 'chartoon';

export default function BarExample({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = new ChartoonBarChart(ref.current, {
      data,
      width: 700,
      height: 320,
      colors: ['#1976d2', '#60a5fa'],
      tooltipConfig: { padding: '8px' },
      responsive: true
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [data]);

  return <div ref={ref} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonBarChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  chart = new ChartoonBarChart(el.value, {
    data: [{ title: 'Series 1', data:[{label:'A',value:30},{label:'B',value:55}] }],
    width:700,
    height:320,
    colors:['#1976d2']
  });
});

onBeforeUnmount(() => {
  if (el.value) el.value.innerHTML = '';
  chart = null;
});
</script>`,

    Svelte: `<!-- Svelte component -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { ChartoonBarChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    chart = new ChartoonBarChart(el, {
      data:[{ title: 'Series 1', data:[{label:'A', value:30},{label:'B', value:55}] }],
      width:700,
      height:320,
      colors:['#1976d2']
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el}></div>`
  },

  line: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonBasicLineChart } from 'chartoon';

export default function LineExample({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = new ChartoonBasicLineChart(ref.current, {
      data,
      width:720,
      height:320,
      colors:['#1976d2','#60a5fa'],
      responsive: true
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [data]);

  return <div ref={ref} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonBasicLineChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  chart = new ChartoonBasicLineChart(el.value, {
    data: [
      { title: 'Jan', data: [{ label: 'A', value: 30 }, { label: 'B', value: 50 }] },
      { title: 'Feb', data: [{ label: 'A', value: 40 }, { label: 'B', value: 60 }] }
    ],
    width:720,
    height:320,
    colors:['#1976d2','#60a5fa']
  });
});

onBeforeUnmount(() => {
  if (el.value) el.value.innerHTML = '';
  chart = null;
});
</script>`,

    Svelte: `<!-- Svelte component -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { ChartoonBasicLineChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    chart = new ChartoonBasicLineChart(el, {
      data: [
        { title: 'Jan', data: [{ label: 'A', value: 30 }, { label: 'B', value: 50 }] },
        { title: 'Feb', data: [{ label: 'A', value: 40 }, { label: 'B', value: 60 }] }
      ],
      width:720,
      height:320,
      colors:['#34d399', '#60a5fa']
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el}></div>`
  },

  pie: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonPieChart } from 'chartoon';

export default function PieExample({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = new ChartoonPieChart(ref.current, {
      data,
      width:320,
      height:320,
      tooltipVisible: true
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [data]);

  return <div ref={ref} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonPieChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  chart = new ChartoonPieChart(el.value, {
    data: [{ name: 'A', value: 30 }, { name: 'B', value: 70 }],
    width:320,
    height:320,
    tooltipVisible: true
  });
});

onBeforeUnmount(() => {
  if (el.value) el.value.innerHTML = '';
  chart = null;
});
</script>`,

    Svelte: `<!-- Svelte component -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { ChartoonPieChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    chart = new ChartoonPieChart(el, {
      data: [{ name: 'A', value: 30 }, { name: 'B', value: 70 }],
      width:320,
      height:320,
      tooltipVisible: true
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el}></div>`
  },

  bullet: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonBulletChart } from 'chartoon';

export default function BulletExample() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    new ChartoonBulletChart(ref.current, {
      data: [
        { title: 'Revenue', ranges:[100,200,300], measures:[220], markers:[250] }
      ],
      width:800,
      height:240
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, []);

  return <div ref={ref} />;
}`
  },

  world: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonMapChart } from 'chartoon';

export default function WorldExample() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    new ChartoonMapChart(ref.current, {
      region: 'eu',
      data: [
        { name: 'France', value: 10 },
        { name: 'Germany', value: 20 }
      ],
      width:900,
      height:600,
      responsive:true
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, []);

  return <div ref={ref} style={{ width:'100%', height:600 }} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el" style="width:100%;height:600px"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonMapChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  chart = new ChartoonMapChart(el.value, {
    region: 'eu',
    data: [
      { name: 'France', value: 10 },
      { name: 'Germany', value: 20 }
    ],
    width:900,
    height:600,
    responsive:true
  });
});

onBeforeUnmount(() => {
  if (el.value) el.value.innerHTML = '';
  chart = null;
});
</script>`,

    Svelte: `<!-- Svelte component -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { ChartoonMapChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    chart = new ChartoonMapChart(el, {
      region: 'eu',
      data: [
        { name: 'France', value: 10 },
        { name: 'Germany', value: 20 }
      ],
      width:900,
      height:600,
      responsive:true
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el} style="width:100%;height:600px"></div>`
  }
};

/**
 * Get snippets for a specific chart type
 */
export function getChartSnippets(chartId: ChartId): Record<string, string> {
  return CHART_SNIPPETS[chartId] ?? {};
}
