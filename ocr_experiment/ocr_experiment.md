# On Academic OCR (Chandra v.s Paddle v.s Deepseek OCR)

## The Three Contestants

So I ran this table through three models - Paddle, Chandra, and DeepSeek - and compared them against the ground truth from an old JSTOR academic paper table.

**Paddle** was surprisingly decent. It kept the numbers right, the columns aligned, the rf/rz pairs in the right order. The differences were purely cosmetic - no fancy `<br>` tags, no italics, but the actual data integrity was there. It's like that quiet engineer who doesn't say much in meetings but actually ships working code.

**Chandra** was more interesting. It tried to be helpful - using LaTeX notation, adding structure, interpreting the semantics. But in doing so, it made actual errors. The Jensen's alpha section got scrambled - t-values attributed to the wrong CAPM definition, extra formula rows that don't exist in the original. It's the classic case of being too clever by half.

**DeepSeek** was, well, a learning experience. Misaligned columns, numbers shifted one position to the right, actual digit errors (-2.61 instead of -2.62), even managed to use a comma instead of a decimal point in one place. This is what happens when your model has seen more marketing copy than actual academic tables.

## The Tables in Question

Here's the ground truth version that I used as reference:

### Ground Truth Table

<table>
  <caption>
    TABLE 1<br>
    Performance Measures &amp; Related Summary Statistics<br>
    (April 1957–March 1971)
  </caption>
  <thead>
    <tr>
      <th rowspan="2">Performance Measure/<br>Summary Statistic</th>
      <th rowspan="2">CAPM<br>defined<br>with</th>
      <th colspan="6">P/E Portfolios<sup>1</sup></th>
      <th colspan="2">Market Portfolios<sup>1</sup></th>
    </tr>
    <tr>
      <th>A</th>
      <th>A*</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
      <th>S</th>
      <th>F</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Median P/E ratio and<br>inter-quartile range<sup>2</sup></td>
      <td>&mdash;</td>
      <td>35.8<br>(41.8)</td>
      <td>30.5<br>(21.0)</td>
      <td>19.1<br>(6.7)</td>
      <td>15.0<br>(3.2)</td>
      <td>12.8<br>(2.6)</td>
      <td>9.8<br>(2.9)</td>
      <td>15.1<br>(9.6)</td>
      <td></td>
    </tr>
    <tr>
      <td>Average annual rate of<br>return (<i>r</i><sub>p</sub>)<sup>3</sup></td>
      <td>&mdash;</td>
      <td>0.0934</td>
      <td>0.0955</td>
      <td>0.0928</td>
      <td>0.1165</td>
      <td>0.1355</td>
      <td>0.1630</td>
      <td>0.1211</td>
      <td>0.1174</td>
    </tr>
    <tr>
      <td rowspan="2">Average annual excess<br>return (r&#8242;<sub>p</sub>)<sup>4</sup></td>
      <td><i>r</i><sub>f</sub></td>
      <td>0.0565</td>
      <td>0.0585</td>
      <td>0.0558</td>
      <td>0.0796</td>
      <td>0.0985</td>
      <td>0.1260</td>
      <td>0.0841</td>
      <td>0.0804</td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.0194</td>
      <td>0.0214</td>
      <td>0.0187</td>
      <td>0.0425</td>
      <td>0.0613</td>
      <td>0.0889</td>
      <td>0.0470</td>
      <td>0.0433</td>
    </tr>
    <tr>
      <td rowspan="2">Systematic risk (&beta;<sub>p</sub>)</td>
      <td><i>r</i><sub>f</sub></td>
      <td>1.1121</td>
      <td>1.0579</td>
      <td>1.0387</td>
      <td>0.9678</td>
      <td>0.9401</td>
      <td>0.9866</td>
      <td>1.0085</td>
      <td>1.0000</td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>1.1463</td>
      <td>1.0919</td>
      <td>1.0224</td>
      <td>0.9485</td>
      <td>0.9575</td>
      <td>1.0413</td>
      <td>1.0225</td>
      <td>1.0000</td>
    </tr>
    <tr>
      <td rowspan="2">Jensen&#8217;s differential<br>return (&delta;<sub>p</sub>) and <i>t</i>-value<br>in parenthesis</td>
      <td><i>r</i><sub>f</sub></td>
      <td>-0.0330<br>(-2.62)</td>
      <td>-0.0265<br>(-2.01)</td>
      <td>-0.0277<br>(-2.85)</td>
      <td>0.0017<br>(0.18)</td>
      <td>0.0228<br>(2.73)</td>
      <td>0.0467<br>(3.98)</td>
      <td>0.0030<br>(0.62)</td>
      <td></td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>-0.0303<br>(-2.59)</td>
      <td>-0.0258<br>(-2.04)</td>
      <td>-0.0256<br>(-2.63)</td>
      <td>0.0014<br>(0.15)</td>
      <td>0.0198<br>(2.34)</td>
      <td>0.0438<br>(3.80)</td>
      <td>0.0027<br>(0.57)</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Treynor&#8217;s reward-to-<br>volatility measure:<sup>5</sup><br>r&#8242;<sub>p</sub> / &beta;<sub>p</sub></td>
      <td><i>r</i><sub>f</sub></td>
      <td>0.0508</td>
      <td>0.0553</td>
      <td>0.0537</td>
      <td>0.0822</td>
      <td>0.1047</td>
      <td>0.1237</td>
      <td>0.0834</td>
      <td>0.0804</td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.0169</td>
      <td>0.0196</td>
      <td>0.0183</td>
      <td>0.0448</td>
      <td>0.0640</td>
      <td>0.0854</td>
      <td>0.0460</td>
      <td>0.0433</td>
    </tr>
    <tr>
      <td rowspan="2">Sharpe&#8217;s reward-to-<br>variability measure:<sup>6</sup><br>r&#8242;<sub>p</sub> / &sigma;(r&#8242;<sub>p</sub>)</td>
      <td><i>r</i><sub>f</sub></td>
      <td>0.0903</td>
      <td>0.0978</td>
      <td>0.0967</td>
      <td>0.1475</td>
      <td>0.1886</td>
      <td>0.2264</td>
      <td>0.1526</td>
      <td>0.1481</td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.0287</td>
      <td>0.0331</td>
      <td>0.0312</td>
      <td>0.0762</td>
      <td>0.1095</td>
      <td>0.1444</td>
      <td>0.0797</td>
      <td>0.0755</td>
    </tr>
    <tr>
      <td rowspan="2">Coefficient of<br>correlation:<br>&rho;(r&#8242;<sub>p</sub>, r&#8242;<sub>m</sub>)</td>
      <td><i>r</i><sub>f</sub></td>
      <td>0.9662</td>
      <td>0.9594</td>
      <td>0.9767</td>
      <td>0.9742</td>
      <td>0.9788</td>
      <td>0.9630</td>
      <td>0.9936</td>
      <td></td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.9748</td>
      <td>0.9676</td>
      <td>0.9780</td>
      <td>0.9767</td>
      <td>0.9809</td>
      <td>0.9705</td>
      <td>0.9946</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Coefficient of serial<br>correlation:<br>&rho;(&epsilon;<sub>t+1</sub>, &epsilon;<sub>t</sub>)</td>
      <td><i>r</i><sub>f</sub></td>
      <td>0.0455</td>
      <td>0.0845</td>
      <td>0.0285</td>
      <td>-0.1234</td>
      <td>0.0065</td>
      <td>0.1623</td>
      <td>0.1050</td>
      <td></td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.0048</td>
      <td>0.0681</td>
      <td>0.0163</td>
      <td>-0.1447</td>
      <td>0.0408</td>
      <td>0.1485</td>
      <td>0.0763</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2"><i>F</i>-Statistics for Test on<br>Homogeneity of Asset-<br>Pricing Relationships<br>(Chow-test)<sup>7</sup></td>
      <td><i>r</i><sub>f</sub></td>
      <td>2.3988</td>
      <td>2.2527</td>
      <td>0.4497</td>
      <td>1.2249</td>
      <td>1.1988</td>
      <td>0.2892</td>
      <td>0.0496</td>
      <td></td>
    </tr>
    <tr>
      <td><i>r</i><sub>z</sub></td>
      <td>0.8918</td>
      <td>0.2490</td>
      <td>0.9767</td>
      <td>0.3575</td>
      <td>0.6987</td>
      <td>0.4761</td>
      <td>0.2826</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Paddle's Attempt

Paddle kept the data integrity but lost the formatting. No fancy HTML, just the raw numbers in the right places.

### Chandra's Interpretation

Chandra tried to be helpful with LaTeX notation but made structural errors in the Jensen's alpha section, mixing up t-values and CAPM definitions.

### DeepSeek's Confusion

DeepSeek had the most issues - misaligned columns, shifted numbers, digit errors, and even comma/decimal point confusion.

## The Verdict

For academic table extraction, Paddle wins by default. It's not pretty, but it's accurate. Chandra's helpfulness backfired, and DeepSeek needs more training on academic content.

Sometimes the boring solution is the right one.