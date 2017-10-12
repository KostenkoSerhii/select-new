```
// start html

<select  class="js-select">
	<option value="placeholder" data-placeholder="true">Country</option>
	<option value="" >USA</option>
	<option value="" >Spain</option>
	<option value="" >Italy</option>
	<option disabled="disabled" value="">Portugal</option>
	<option value="" >Germany</option>
</select>
```
  

 ```
// js init

 new Select({
	selector: ".js-select",
  cssClass: "select-custom"
});
 
  
  
