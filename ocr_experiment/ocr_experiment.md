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

```html
<html><body><table><tr><td rowspan="2">Performance Measure/ Summary Statistic</td><td rowspan="2">CAPM defined with</td><td colspan="6">P/E Portfolios¹</td><td colspan="2">Market Portfolios¹</td></tr><tr><td>A</td><td>A*</td><td>B</td><td>C</td><td>D</td><td>E</td><td>S</td><td>F</td></tr><tr><td>Median P/E ratio and inter-quartile range²</td><td>—</td><td>35.8 (41.8)</td><td>30.5 (21.0)</td><td>19.1 (6.7)</td><td>15.0 (3.2)</td><td>12.8 (2.6)</td><td>9.8 (2.9)</td><td>15.1 (9.6)</td><td></td></tr><tr><td>Average annual rate of return (rP)³</td><td>—</td><td>0.0934</td><td>0.0955</td><td>0.0928</td><td>0.1165</td><td>0.1355</td><td>0.1630</td><td>0.1211</td><td>0.1174</td></tr><tr><td>Average annual excess</td><td>rf</td><td>0.0565</td><td>0.0585</td><td>0.0558</td><td>0.0796</td><td>0.0985</td><td>0.1260</td><td>0.0841</td><td>0.0804</td></tr><tr><td>return (rP)⁴</td><td>rz</td><td>0.0194</td><td>0.0214</td><td>0.0187</td><td>0.0425</td><td>0.0613</td><td>0.0889</td><td>0.0470</td><td>0.0433</td></tr><tr><td>Systematic risk (βp)</td><td>rf</td><td>1.1121</td><td>1.0579</td><td>1.0387</td><td>0.9678</td><td>0.9401</td><td>0.9866</td><td>1.0085</td><td>1.0000</td></tr><tr><td></td><td>rz</td><td>1.1463</td><td>1.0919</td><td>1.0224</td><td>0.9485</td><td>0.9575</td><td>1.0413</td><td>1.0225</td><td>1.0000</td></tr><tr><td>Jensen's differential</td><td>rf</td><td>-0.0330</td><td>-0.0265</td><td>-0.0277</td><td>0.0017</td><td>0.0228</td><td>0.0467</td><td>0.0030</td><td></td></tr><tr><td>return (δp) and t-value</td><td></td><td>(-2.62)</td><td>(-2.01)</td><td>(-2.85)</td><td>(0.18)</td><td>(2.73)</td><td>(3.98)</td><td>(0.62)</td><td></td></tr><tr><td>in parenthesis</td><td>rz</td><td>-0.0303</td><td>-0.0258</td><td>-0.0256</td><td>0.0014</td><td>0.0198</td><td>0.0438</td><td>0.0027</td><td></td></tr><tr><td></td><td></td><td>(-2.59)</td><td>(-2.04)</td><td>(-2.63)</td><td>(0.15)</td><td>(2.34)</td><td>(3.80)</td><td>(0.57)</td><td></td></tr><tr><td>Treynor's reward-to...</td></tr></table></body></html>
```

Paddle kept the data integrity but lost the formatting. No fancy HTML, just the raw numbers in the right places.

### Chandra's Interpretation

| Performance Measure/<br>Summary Statistic                                                              | CAPM<br>defined<br>with | P/E Portfolios <sup>1</sup> |                |               |               |               | Market<br>Portfolios <sup>1</sup> |               |        |
|--------------------------------------------------------------------------------------------------------|-------------------------|-----------------------------|----------------|---------------|---------------|---------------|-----------------------------------|---------------|--------|
|                                                                                                        |                         | A                           | A*             | B             | C             | D             | E                                 | S             | F      |
| Median P/E ratio and<br>inter-quartile range <sup>2</sup>                                              | —                       | 35.8<br>(41.8)              | 30.5<br>(21.0) | 19.1<br>(6.7) | 15.0<br>(3.2) | 12.8<br>(2.6) | 9.8<br>(2.9)                      | 15.1<br>(9.6) |        |
| Average annual rate of<br>return ( $r_p^3$ )                                                           | —                       | 0.0934                      | 0.0955         | 0.0928        | 0.1165        | 0.1355        | 0.1630                            | 0.1211        | 0.1174 |
| Average annual excess<br>return ( $r_p^4$ )                                                            | $r_f$                   | 0.0565                      | 0.0585         | 0.0558        | 0.0796        | 0.0985        | 0.1260                            | 0.0841        | 0.0804 |
|                                                                                                        | $r_z$                   | 0.0194                      | 0.0214         | 0.0187        | 0.0425        | 0.0613        | 0.0889                            | 0.0470        | 0.0433 |
| Systematic risk ( $\hat{\beta}_p$ )                                                                    | $r_f$                   | 1.1121                      | 1.0579         | 1.0387        | 0.9678        | 0.9401        | 0.9866                            | 1.0085        | 1.0000 |
|                                                                                                        | $r_z$                   | 1.1463                      | 1.0919         | 1.0224        | 0.9485        | 0.9575        | 1.0413                            | 1.0225        | 1.0000 |
| Jensen's differential<br>return ( $\hat{\delta}_p$ ) and $t$ -value<br>in parenthesis                  | $r_f$                   | -0.0330                     | -0.0265        | -0.0277       | 0.0017        | 0.0228        | 0.0467                            | 0.0030        |        |
|                                                                                                        | $r_z$                   | (-2.62)                     | (-2.01)        | (-2.85)       | (0.18)        | (2.73)        | (3.98)                            | (0.62)        |        |
|                                                                                                        |                         | -0.0303                     | -0.0258        | -0.0256       | 0.0014        | 0.0198        | 0.0438                            | 0.0027        |        |
|                                                                                                        |                         | (-2.59)                     | (-2.04)        | (-2.63)       | (0.15)        | (2.34)        | (3.80)                            | (0.57)        |        |
| Treynor's reward-to-<br>volatility measure: <sup>5</sup>                                               | $r_f$                   | 0.0508                      | 0.0553         | 0.0537        | 0.0822        | 0.1047        | 0.1237                            | 0.0834        | 0.0804 |
|                                                                                                        | $r_z$                   | 0.0169                      | 0.0196         | 0.0183        | 0.0448        | 0.0640        | 0.0854                            | 0.0460        | 0.0433 |
| $r_p^6 / \beta_p$                                                                                      |                         |                             |                |               |               |               |                                   |               |        |
| Sharpe's reward-to-<br>variability measure: <sup>6</sup>                                               | $r_f$                   | 0.0903                      | 0.0978         | 0.0967        | 0.1475        | 0.1886        | 0.2264                            | 0.1526        | 0.1481 |
|                                                                                                        | $r_z$                   | 0.0287                      | 0.0331         | 0.0312        | 0.0762        | 0.1095        | 0.1444                            | 0.0797        | 0.0755 |
| $r_p^7 / \sigma(r_p^7)$                                                                                |                         |                             |                |               |               |               |                                   |               |        |
| Coefficient of correla-<br>tion: $\rho(r_p^7, \bar{r}_m^7)$                                            | $r_f$                   | 0.9662                      | 0.9594         | 0.9767        | 0.9742        | 0.9788        | 0.9630                            | 0.9936        |        |
|                                                                                                        | $r_z$                   | 0.9748                      | 0.9676         | 0.9780        | 0.9767        | 0.9809        | 0.9705                            | 0.9946        |        |
| Coefficient of serial<br>correlation: $\rho(\hat{\epsilon}_{t+1}, \hat{\epsilon}_t)$                   | $r_f$                   | 0.0455                      | 0.0845         | 0.0285        | -0.1234       | 0.0065        | 0.1623                            | 0.1050        |        |
|                                                                                                        | $r_z$                   | 0.0048                      | 0.0681         | 0.0163        | -0.1447       | 0.0408        | 0.1485                            | 0.0763        |        |
| F-Statistics for Test on<br>Homogeneity of Asset-<br>Pricing Relationships<br>(Chow-test) <sup>7</sup> | $r_f$                   | 2.3988                      | 2.2527         | 0.4497        | 1.2249        | 1.1988        | 0.2892                            | 0.0496        |        |
|                                                                                                        | $r_z$                   | 0.8918                      | 0.2490         | 0.9767        | 0.3575        | 0.6987        | 0.4761                            | 0.2826        |        |

Chandra tried to be helpful with LaTeX notation but made structural errors in the Jensen's alpha section, mixing up t-values and CAPM definitions.

### DeepSeek's Confusion

```html
<table><tr><td rowspan="2">Performance Measure/ Summary Statistic</td><td rowspan="2">CAPM defined with</td><td colspan="6">P/E Portfolios1</td><td colspan="2">Market Portfolios1</td></tr><tr><td>A</td><td>\(A^{*}\)</td><td>B</td><td>C</td><td>D</td><td>E</td><td>S</td><td>F</td></tr><tr><td>Median P/E ratio and<br>inter-quartile range2</td><td>-</td><td>35.8<br>(41.8)</td><td>30.5<br>(21.0)</td><td>19.1<br>(6.7)</td><td>15.0<br>(3.2)</td><td>12.8<br>(2.6)</td><td>9.8<br>(2.9)</td><td>15.1<br>(9.6)</td><td></td></tr><tr><td>Average annual rate of<br>return \((r_{p})^{3}\)</td><td>-</td><td>0.0934</td><td>0.0955</td><td>0.0928</td><td>0.1165</td><td>0.1355</td><td>0.1630</td><td>0.1211</td><td>0.1174</td></tr><tr><td>Average annual excess<br>return \((r_{p}^{\prime })^{4}\)</td><td>\(r_{f}\)</td><td>0.0565</td><td>0.0585</td><td>0.0558</td><td>0.0796</td><td>0.0985</td><td>0.1260</td><td>0.0841</td><td>0.0804</td></tr><tr><td></td><td>\(r_{z}\)</td><td>0.0194</td><td>0.0214</td><td>0.0187</td><td>0.0425</td><td>0.0613</td><td>0.0889</td><td>0.0470</td><td>0.0433</td></tr><tr><td>Systematic risk \((\hat {\beta }_{p})\)</td><td>\(r_{f}\)</td><td>1.1121</td><td>1.0579</td><td>1.0387</td><td>0.9678</td><td>0.9401</td><td>0.9866</td><td>1.0085</td><td>1.0000</td></tr><tr><td></td><td>\(r_{z}\)</td><td>1.1463</td><td>1.0919</td><td>1.0224</td><td>0.9485</td><td>0.9575</td><td>1.0413</td><td>1.0225</td><td>1.0000</td></tr><tr><td>Jensen's differential<br>return \((\hat {\delta }_{p})\) and \(t\) -value<br>in parenthesis</td><td>\(r_{f}\) \((-2.62)\)</td><td>\(-0.0330\) \((-2.61)\)</td><td>\(-0.0265\) \((-2.01)\)</td><td>\(-0.0277\) \((-2.85)\)</td><td>0.0017<br>(0.18)</td><td>0.0228<br>(2.73)</td><td>0.0467<br>(3.98)</td><td>0.0030<br>(0.62)</td><td></td></tr><tr><td></td><td>\(r_{z}\)</td><td>\(-0.0303\) \((-2.59)\)</td><td>\(-0.0258\) \((-2.04)\)</td><td>\(-0.0256\) \((-2.63)\)</td><td>0.0014<br>(0.15)</td><td>0.0198<br>(2.34)</td><td>0.0438<br>(3.80)</td><td>0.0027<br>(0...</td></tr></table>
```

DeepSeek had the most issues - misaligned columns, shifted numbers, digit errors, and even comma/decimal point confusion.

## The Verdict

For academic table extraction, Paddle wins by default. It's not pretty, but it's accurate. Chandra's helpfulness backfired, and DeepSeek needs more training on academic content.

Sometimes the boring solution is the right one.