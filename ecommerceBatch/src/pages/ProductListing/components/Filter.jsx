import clsx from 'clsx';
import { RiFilterLine } from 'react-icons/ri';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
// collections -> brand
// category -> type
import { useProductListingContext } from './ProductListingContext';

import CheckboxInput from '../../../components/ui/CheckboxInput';
import SlideOut from '../../../components/ui/SlideOut';
import Button from '../../../components/ui/Button';
import { BRAND_OPTIONS, TYPE_OPTIONS } from '../../../constants';

const Filter = () => {
  const {
    selectedType,
    selectedBrands,
    filterCount,
    onSelect,
    resetFilters,
  } = useProductListingContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterItems = (
    <div className="flex flex-col items-center">
      <Accordion>
        <AccordionItem id={BRAND_OPTIONS.key}>
          <AccordionTrigger>{BRAND_OPTIONS.title}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 lg:gap-6">
              {BRAND_OPTIONS.items.map(({ name, value }) => (
                <CheckboxInput
                  label={name}
                  key={value}
                  value={selectedBrands.has(value)}
                  onChange={() => onSelect(BRAND_OPTIONS.key, value)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id={TYPE_OPTIONS.key}>
          <AccordionTrigger>{TYPE_OPTIONS.title}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {TYPE_OPTIONS.items.map(({ name, value }) => (
                <CheckboxInput
                  label={name}
                  key={value}
                  value={selectedType.has(value)}
                  onChange={() => onSelect(TYPE_OPTIONS.key, value)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
    
      </Accordion>
      {filterCount > 0 && (
        <Button
          onClick={() => {
            resetFilters();
            setIsFilterOpen(false);
          }}
          label={`Clear All (${filterCount})`}
          variant="link"
          size="lg"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="sticky top-10 hidden lg:block">{filterItems}</div>
      <div className="block lg:hidden">
        <SlideOut
          isShown={isFilterOpen}
          title={<span className="text-xl text-neutral-900">Filter</span>}
          onClose={() => setIsFilterOpen(false)}
          trigger={
            <Button
              label="Filter"
              variant="secondary"
              startIcon={RiFilterLine}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            />
          }>
          {filterItems}
        </SlideOut>
      </div>
    </div>
  );
};

export default Filter;
