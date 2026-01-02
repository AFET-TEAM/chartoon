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

  area: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonBasicLineChart } from 'chartoon';

export default function AreaExample() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const areaData = [
      { title: "Jan", data: [{ label: "A", value: 30 }, { label: "B", value: 50 }, { label: "C", value: 40 }] },
      { title: "Feb", data: [{ label: "A", value: 40 }, { label: "B", value: 60 }, { label: "C", value: 55 }] },
      { title: "Mar", data: [{ label: "A", value: 35 }, { label: "B", value: 55 }, { label: "C", value: 50 }] },
      { title: "Apr", data: [{ label: "A", value: 50 }, { label: "B", value: 70 }, { label: "C", value: 65 }] }
    ];

    const chart = new ChartoonBasicLineChart(ref.current, {
      data: areaData,
      width: 720,
      height: 320,
      colors: ['#1976d2', '#60a5fa', '#ef4444'],
      responsive: true,
      type: 'area'
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, []);

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
  const areaData = [
    { title: 'Jan', data: [{ label: 'A', value: 30 }, { label: 'B', value: 50 }, { label: 'C', value: 40 }] },
    { title: 'Feb', data: [{ label: 'A', value: 40 }, { label: 'B', value: 60 }, { label: 'C', value: 55 }] },
    { title: 'Mar', data: [{ label: 'A', value: 35 }, { label: 'B', value: 55 }, { label: 'C', value: 50 }] },
    { title: 'Apr', data: [{ label: 'A', value: 50 }, { label: 'B', value: 70 }, { label: 'C', value: 65 }] }
  ];

  chart = new ChartoonBasicLineChart(el.value, {
    data: areaData,
    width: 720,
    height: 320,
    colors: ['#1976d2', '#60a5fa', '#ef4444'],
    responsive: true,
    type: 'area'
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
    const areaData = [
      { title: 'Jan', data: [{ label: 'A', value: 30 }, { label: 'B', value: 50 }, { label: 'C', value: 40 }] },
      { title: 'Feb', data: [{ label: 'A', value: 40 }, { label: 'B', value: 60 }, { label: 'C', value: 55 }] },
      { title: 'Mar', data: [{ label: 'A', value: 35 }, { label: 'B', value: 55 }, { label: 'C', value: 50 }] },
      { title: 'Apr', data: [{ label: 'A', value: 50 }, { label: 'B', value: 70 }, { label: 'C', value: 65 }] }
    ];

    chart = new ChartoonBasicLineChart(el, {
      data: areaData,
      width: 720,
      height: 320,
      colors: ['#1976d2', '#60a5fa', '#ef4444'],
      responsive: true,
      type: 'area'
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

    const bulletData = [
      {
        title: 'Gelir',
        subtitle: '2024 Q4',
        ranges: [150, 225, 300],
        measures: [220, 270],
        markers: [250]
      },
      {
        title: 'Kar',
        subtitle: '2024 Q4',
        ranges: [20, 50, 100],
        measures: [35, 60],
        markers: [70]
      }
    ];

    new ChartoonBulletChart(ref.current, {
      data: bulletData,
      width: 800,
      height: 400,
      margin: { top: 20, right: 40, bottom: 20, left: 120 },
      responsive: true
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, []);

  return <div ref={ref} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonBulletChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  const bulletData = [
    {
      title: 'Gelir',
      subtitle: '2024 Q4',
      ranges: [150, 225, 300],
      measures: [220, 270],
      markers: [250]
    },
    {
      title: 'Kar',
      subtitle: '2024 Q4',
      ranges: [20, 50, 100],
      measures: [35, 60],
      markers: [70]
    }
  ];

  chart = new ChartoonBulletChart(el.value, {
    data: bulletData,
    width: 800,
    height: 400,
    margin: { top: 20, right: 40, bottom: 20, left: 120 },
    responsive: true
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
  import { ChartoonBulletChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    const bulletData = [
      {
        title: 'Gelir',
        subtitle: '2024 Q4',
        ranges: [150, 225, 300],
        measures: [220, 270],
        markers: [250]
      },
      {
        title: 'Kar',
        subtitle: '2024 Q4',
        ranges: [20, 50, 100],
        measures: [35, 60],
        markers: [70]
      }
    ];

    chart = new ChartoonBulletChart(el, {
      data: bulletData,
      width: 800,
      height: 400,
      margin: { top: 20, right: 40, bottom: 20, left: 120 },
      responsive: true
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el}></div>`
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
      responsive:true,
      tooltipVisible:true
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
  },

  radar: {
    React: `import { useEffect, useRef } from 'react';
import { ChartoonRadarChart } from 'chartoon';

export default function RadarExample() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const radarChartData = [
      {
        title: "Frontend",
        data: [
          { label: "Performance", value: 85 },
          { label: "Accessibility", value: 70 },
          { label: "SEO", value: 90 },
          { label: "Best Practices", value: 80 },
          { label: "UX", value: 88 },
        ],
      },
      {
        title: "Backend",
        data: [
          { label: "Performance", value: 78 },
          { label: "Accessibility", value: 60 },
          { label: "SEO", value: 65 },
          { label: "Best Practices", value: 92 },
          { label: "UX", value: 70 },
        ],
      },
      {
        title: "DevOps",
        data: [
          { label: "Performance", value: 90 },
          { label: "Accessibility", value: 55 },
          { label: "SEO", value: 50 },
          { label: "Best Practices", value: 88 },
          { label: "UX", value: 60 },
        ],
      },
    ];

    new ChartoonRadarChart(ref.current, {
      data: radarChartData,
      width: 600,
      height: 400,
      responsive: true,
      colors: ["red", "black", "blue"],
      levels: 5,
      maxValue: 100,
      areaOpacity: 0.35,
      strokeWidth: 1,
      circleConfig: {
        radius: 4,
      },
    });

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, []);

  return <div ref={ref} style={{ width:'100%', height:400 }} />;
}`,

    Vue: `<!-- Vue 3 component -->
<template>
  <div ref="el" style="width:100%;height:400px"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { ChartoonRadarChart } from 'chartoon';

const el = ref(null);
let chart = null;

onMounted(() => {
  const radarChartData = [
    {
      title: "Frontend",
      data: [
        { label: "Performance", value: 85 },
        { label: "Accessibility", value: 70 },
        { label: "SEO", value: 90 },
        { label: "Best Practices", value: 80 },
        { label: "UX", value: 88 },
      ],
    },
    {
      title: "Backend",
      data: [
        { label: "Performance", value: 78 },
        { label: "Accessibility", value: 60 },
        { label: "SEO", value: 65 },
        { label: "Best Practices", value: 92 },
        { label: "UX", value: 70 },
      ],
    },
    {
      title: "DevOps",
      data: [
        { label: "Performance", value: 90 },
        { label: "Accessibility", value: 55 },
        { label: "SEO", value: 50 },
        { label: "Best Practices", value: 88 },
        { label: "UX", value: 60 },
      ],
    },
  ];

  chart = new ChartoonRadarChart(el.value, {
    data: radarChartData,
    width: 600,
    height: 400,
    responsive: true,
    colors: ["red", "black", "blue"],
    levels: 5,
    maxValue: 100,
    areaOpacity: 0.35,
    strokeWidth: 1,
    circleConfig: {
      radius: 4,
    },
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
  import { ChartoonRadarChart } from 'chartoon';

  let el;
  let chart;

  onMount(() => {
    const radarChartData = [
      {
        title: "Frontend",
        data: [
          { label: "Performance", value: 85 },
          { label: "Accessibility", value: 70 },
          { label: "SEO", value: 90 },
          { label: "Best Practices", value: 80 },
          { label: "UX", value: 88 },
        ],
      },
      {
        title: "Backend",
        data: [
          { label: "Performance", value: 78 },
          { label: "Accessibility", value: 60 },
          { label: "SEO", value: 65 },
          { label: "Best Practices", value: 92 },
          { label: "UX", value: 70 },
        ],
      },
      {
        title: "DevOps",
        data: [
          { label: "Performance", value: 90 },
          { label: "Accessibility", value: 55 },
          { label: "SEO", value: 50 },
          { label: "Best Practices", value: 88 },
          { label: "UX", value: 60 },
        ],
      },
    ];

    chart = new ChartoonRadarChart(el, {
      data: radarChartData,
      width: 600,
      height: 400,
      responsive: true,
      colors: ["red", "black", "blue"],
      levels: 5,
      maxValue: 100,
      areaOpacity: 0.35,
      strokeWidth: 1,
      circleConfig: {
        radius: 4,
      },
    });
  });

  onDestroy(() => {
    if (el) el.innerHTML = '';
    chart = null;
  });
</script>

<div bind:this={el} style="width:100%;height:400px"></div>`
  }
};

/**
 * Get snippets for a specific chart type
 */
export function getChartSnippets(chartId: ChartId): Record<string, string> {
  return CHART_SNIPPETS[chartId] ?? {};
}
