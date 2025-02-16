import { Collapse, createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import { DataTableRowExpansionCollapseProps } from './DataTable.props';
import { useRowExpansionStatus } from './hooks';

const useStyles = createStyles({
  cell: {
    '&&': {
      borderBottomWidth: 0,
      padding: 0,
    },
  },
  expandedCell: {
    '&&': {
      borderBottomWidth: 1,
    },
  },
});

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => ReactNode;
  collapseProps?: DataTableRowExpansionCollapseProps;
};

export default function DataTableRowExpansion({ open, colSpan, content, collapseProps }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, collapseProps?.transitionDuration);

  const { cx, classes } = useStyles();

  return visible ? (
    <>
      {/* add an empty row to maintain striped rows consistency */}
      <tr />
      <tr>
        <td className={cx(classes.cell, { [classes.expandedCell]: expanded })} colSpan={colSpan}>
          <Collapse in={expanded} {...collapseProps}>
            {content()}
          </Collapse>
        </td>
      </tr>
    </>
  ) : null;
}
